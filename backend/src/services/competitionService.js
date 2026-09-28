// Business logic for competitions, kept separate from controllers

const Competition = require('../models/Competition');

exports.findAll = async () => {
  return Competition.find();
};

exports.findById = async (id) => {
  return Competition.findById(id);
};
