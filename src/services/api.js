import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiadvisor.climatempo.com.br',
});

export default api;
