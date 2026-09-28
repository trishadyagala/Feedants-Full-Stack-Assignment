require("dotenv").config();

const mongoose = require("mongoose");
const Competition = require("./models/Competition");

const competition = {
  title: "Feedants Classical Dance",
  category: "Dance",
  type: "Classical Dance",
  prizePool: 50000,
  entryFee: 99,
  maxParticipants: 100,
  participantCount: 53,

  registrationStart: new Date("2026-09-20T00:00:00"),
  registrationDeadline: new Date("2026-10-05T23:59:59"),
  submissionStart: new Date("2026-09-25T00:00:00"),
  submissionEnd: new Date("2026-10-10T23:59:59"),
  resultDate: new Date("2026-10-15T18:00:00"),

  description:
    "Showcase your classical dance talent and compete with performers from across the country.",

  judge: {
    name: "Ananya Rao",
    profession: "Classical Dance Expert",
    experience: "15+ years experience",
    image: ""
  },

  rewards: [
    {
      position: 1,
      title: "Winner",
      amount: 25000
    },
    {
      position: 2,
      title: "Runner Up",
      amount: 15000
    },
    {
      position: 3,
      title: "Second Runner Up",
      amount: 10000
    }
  ]
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Competition.deleteMany();

    await Competition.create(competition);

    console.log("Competition data added successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedDatabase();