import axios from 'axios';

const api = axios.create({
    baseURL: "https://dropbox-backen.herokuapp.com/"
});

export default api;