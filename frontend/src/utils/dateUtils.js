export const formatDate = (date) => new Date(date).toDateString();

export const isUpcoming = (startDate) => new Date(startDate) > new Date();

export const isEnded = (endDate) => new Date(endDate) < new Date();
