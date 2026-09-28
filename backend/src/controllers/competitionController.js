// Handles competition-related logic

const mongoose = require("mongoose");
const Competition = require("../models/Competition");
const Participation = require("../models/Participation");

// Get all competitions
exports.getCompetitions = async (req, res) => {
  try {
    const competitions = await Competition.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: competitions.length,
      data: competitions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch competitions",
      error: error.message
    });
  }
};

// Get one competition by ID
exports.getCompetitionById = async (req, res) => {
  try {
    const competition = await Competition.findById(req.params.id);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found"
      });
    }

    const spotsRemaining =
      competition.maxParticipants - competition.participantCount;

    res.status(200).json({
      success: true,
      data: {
        ...competition.toObject(),
        spotsRemaining
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch competition",
      error: error.message
    });
  }
};

// Register for a competition
exports.registerForCompetition = async (req, res) => {
  const session = await mongoose.startSession();

  try {
   const userId = req.user.userId;
   const competitionId = req.params.id;

    if (
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(competitionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid userId or competitionId"
      });
    }

    session.startTransaction();

    const competition = await Competition.findById(
      competitionId
    ).session(session);

    if (!competition) {
      await session.abortTransaction();

      return res.status(404).json({
        success: false,
        message: "Competition not found"
      });
    }

    const now = new Date();

    // Registration window validation
    if (now < competition.registrationStart) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Registration has not started yet"
      });
    }

    if (now > competition.registrationDeadline) {
      await session.abortTransaction();

      return res.status(400).json({
        success: false,
        message: "Registration has closed"
      });
    }

    // Check whether the user is already registered
    const existingParticipation =
      await Participation.findOne({
        competitionId,
        userId
      }).session(session);

    if (existingParticipation) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "You are already registered"
      });
    }

    // Atomically reserve one spot
    const updatedCompetition =
      await Competition.findOneAndUpdate(
        {
          _id: competitionId,
          participantCount: {
            $lt: competition.maxParticipants
          }
        },
        {
          $inc: {
            participantCount: 1
          }
        },
        {
          new: true,
          session
        }
      );

    if (!updatedCompetition) {
      await session.abortTransaction();

      return res.status(409).json({
        success: false,
        message: "Competition is full"
      });
    }

    // Create participation record
    await Participation.create(
      [
        {
          competitionId,
          userId,
          registeredAt: now,
          status: "REGISTERED"
        }
      ],
      { session }
    );

    await session.commitTransaction();

    const spotsRemaining =
      updatedCompetition.maxParticipants -
      updatedCompetition.participantCount;

    return res.status(201).json({
      success: true,
      message: "Successfully registered for the competition",
      data: {
        competitionId,
        userId,
        status: "REGISTERED",
        spotsRemaining
      }
    });
  } catch (error) {
    await session.abortTransaction();

    // Duplicate registration protection
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You are already registered"
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message
    });
  } finally {
    await session.endSession();
  }
};