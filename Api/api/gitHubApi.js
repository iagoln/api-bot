require('dotenv').config();
const axios = require('axios');

const githubApi = axios.create({
  baseURL: process.env.URL_API_GIT
});

module.exports = githubApi;