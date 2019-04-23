import axios from 'axios';

const api = axios.create({
    baseURL: "https://droppbox-back.herokuapp.com"
});

export default api;