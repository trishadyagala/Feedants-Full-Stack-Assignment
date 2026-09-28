import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const getCompetitions = () => api.get('/competitions');
export const getCompetitionById = (id) => api.get(`/competitions/${id}`);
export const registerForCompetition = (id) => api.post(`/competitions/${id}/register`);

export default api;
