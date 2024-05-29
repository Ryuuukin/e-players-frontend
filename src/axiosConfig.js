// src/axiosConfig.js

import axios from 'axios';

// Ensure cookies are sent with requests
axios.defaults.withCredentials = true;

export default axios;
