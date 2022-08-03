import axios from 'axios'
let baseURL;
const instance = axios.create({
    baseURL: baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 150000
});