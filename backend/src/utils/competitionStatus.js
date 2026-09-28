// Utility to compute a competition's current status based on dates

const getCompetitionStatus = (startDate, endDate) => {
  const now = new Date();
  if (now < new Date(startDate)) return 'upcoming';
  if (now > new Date(endDate)) return 'ended';
  return 'ongoing';
};

module.exports = getCompetitionStatus;
