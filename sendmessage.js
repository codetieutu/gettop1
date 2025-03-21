const axios = require('axios');
require("dotenv").config();

const TOKEN = process.env.TOKEN;

async function sendMessage(message, id) {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: id,
            text: message
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

module.exports = { sendMessage }
