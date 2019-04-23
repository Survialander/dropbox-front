import axios from 'axios';

const api = axios.create({
    baseURL: "https://dropp-box-back.herokuapp.com/"
});

export default api;