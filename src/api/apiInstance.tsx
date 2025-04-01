import axios from 'axios';

const apiInstance = axios.create({
    baseURL: 'http://localhost:3000', // Replace with your API base URL
    timeout: 100000, // Request timeout in milliseconds
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiInstance;
