const { v4: uuidv4 } = require('uuid');
const db = require('../../database/db');

// Middleware to generate random hash unique IDs
const uniqueIdGenerator = () => {
    const uId = uuidv4();
    return uId;
};

const appId_generator = () => {
    const uId = uuidv4();
    const truncatedId = uId.replace(/-/g, '').substring(0, 6); // Remove dashes and take the first 6 characters
    return truncatedId;
}

module.exports = {
    uniqueIdGenerator,
    appId_generator
};