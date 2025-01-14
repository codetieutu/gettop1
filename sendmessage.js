const axios = require('axios');

const TOKEN = '7941486664:AAGhSJea3p7xYQ1fDIRAOeZ4X6_Uqc7j4W4';

async function sendMessage(message, id) {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: id,
            text: message
        });
        console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

sendMessage("hai không rep con bot đi hồi nó không gửi lại hỏi", "484507121");
