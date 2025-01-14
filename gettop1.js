const axios = require('axios');
const cheerio = require('cheerio');
const { send } = require('process');

const url = 'https://www.z2u.com/product-31279/Account-Adobe-Individuals-Creative-Cloud-All-Apps-14-Days-Experience-Other.html';
const TOKEN = '7941486664:AAGhSJea3p7xYQ1fDIRAOeZ4X6_Uqc7j4W4';

let top1 = '';
let pricel = '';

async function sendMessage(message, id) {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: id,
            text: message
        });
        // console.log('Message sent:', response.data);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

async function gettop1() {
    try {

        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const username = $('.sellerName .userNameMaxText').first().text().trim();

        const price = $('.zu-flex.priceBar .price').text().trim();
        if (top1 !== username && price !== pricel) {
            sendMessage(`New top 1: ${username}, price: ${price}`, "484507121");
            console.log(`New top 1: ${username}, price: ${price}`);
            pricel = price;
            top1 = username;
        }

    } catch (error) {
        console.error('Lỗi khi lấy hoặc xử lý HTML:', error.message);
    }
}


setInterval(gettop1, 10000);
console.log("running...");