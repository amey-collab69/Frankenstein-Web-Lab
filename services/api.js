import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const terminalAPI = {
  saveLogs: (log) => axios.post(`${API_BASE}/terminal/logs`, log),
  getLogs: (limit = 10) => axios.get(`${API_BASE}/terminal/logs?limit=${limit}`),
  deleteLog: (id) => axios.delete(`${API_BASE}/terminal/logs/${id}`)
};

export const canvasAPI = {
  save: (art) => axios.post(`${API_BASE}/canvas/save`, art),
  list: () => axios.get(`${API_BASE}/canvas/list`),
  get: (id) => axios.get(`${API_BASE}/canvas/${id}`)
};

export const dashboardAPI = {
  createCard: (card) => axios.post(`${API_BASE}/dashboard/cards`, card),
  getCards: () => axios.get(`${API_BASE}/dashboard/cards`),
  deleteCard: (id) => axios.delete(`${API_BASE}/dashboard/cards/${id}`)
};

export const fusionAPI = {
  pixelToAscii: (pixels) => axios.post(`${API_BASE}/fusion/pixel-to-ascii`, { pixels }),
  terminalToDashboard: (logId, userId) => 
    axios.post(`${API_BASE}/fusion/terminal-to-dashboard`, { logId, userId }),
  pixelToDashboard: (artId, userId) => 
    axios.post(`${API_BASE}/fusion/pixel-to-dashboard`, { artId, userId })
};
