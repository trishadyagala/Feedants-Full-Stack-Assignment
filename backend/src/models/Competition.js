const mongoose = require("mongoose");

const competitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true
    },

    type: {
      type: String,
      required: true
    },

    prizePool: {
      type: Number,
      required: true,
      min: 0
    },

    entryFee: {
      type: Number,
      required: true,
      min: 0
    },

    maxParticipants: {
      type: Number,
      required: true,
      min: 1
    },

    participantCount: {
      type: Number,
      default: 0,
      min: 0
    },

    registrationStart: {
      type: Date,
      required: true
    },

    registrationDeadline: {
      type: Date,
      required: true
    },

    submissionStart: {
      type: Date,
      required: true
    },

    submissionEnd: {
      type: Date,
      required: true
    },

    resultDate: {
      type: Date,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    judge: {
      name: String,
      profession: String,
      experience: String,
      image: String
    },

    rewards: [
      {
        position: Number,
        title: String,
        amount: Number
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Competition", competitionSchema);
