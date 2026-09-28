const mongoose = require("mongoose");

const participationSchema = new mongoose.Schema(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    registeredAt: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["REGISTERED", "SUBMITTED", "WITHDRAWN"],
      default: "REGISTERED"
    }
  },
  {
    timestamps: true
  }
);

// Prevent the same user from registering twice
participationSchema.index(
  { competitionId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Participation", participationSchema);