const express = require("express");

const router = express.Router();

const {
  getCompetitions,
  getCompetitionById,
  registerForCompetition
} = require("../controllers/competitionController");

const protect = require("../middleware/authMiddleware");

router.get("/", getCompetitions);

router.get("/:id", getCompetitionById);

// Registration requires a logged-in user
router.post("/:id/register", protect, registerForCompetition);

module.exports = router;