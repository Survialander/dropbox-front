import axios from 'axios';

const api = axios.create({
    baseURL: "https://droppbox.herokuapp.com/"
});

export default api;