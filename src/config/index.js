const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

export default config;