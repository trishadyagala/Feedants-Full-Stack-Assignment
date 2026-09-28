// Run this script to seed sample competition data into the database
require('dotenv').config();
const connectDB = require('../config/database');
const Competition = require('../models/Competition');

const seed = async () => {
  await connectDB();

  await Competition.deleteMany();

  await Competition.create({
    title: 'Sample Competition',
    description: 'A sample competition for testing',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    judges: ['Judge One', 'Judge Two'],
    rewards: ['1st Prize: $500', '2nd Prize: $250'],
  });

  console.log('Seed data inserted');
  process.exit();
};

seed();
