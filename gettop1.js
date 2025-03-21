const axios = require('axios');
const cheerio = require('cheerio');
const { sendMessage } = require("./sendmessage");

const url_adobe = 'https://www.z2u.com/product-31279/Account-Adobe-Individuals-Creative-Cloud-All-Apps-14-Days-Experience-Other.html';
const url_chatgpt = "https://www.z2u.com/product-7941/ChatGPT-Plus-shared-account-by-5-people.html";

let top1Adobe = '';
let priceAdobe = '';
let top1Chatgpt = "";
let priceChatgpt = "";

async function getTop1(url, mess, currentTop, currentPrice) {
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const html = response.data;
        const $ = cheerio.load(html);

        const username = $('.sellerName .userNameMaxText').first().text().trim();
        const price = $('.priceBar .price').first().text().trim(); // Adjust selector if needed

        if (currentTop !== username) {
            // sendMessage(`New top 1 ${mess}: ${username}, price: ${price}`, "484507121");
            sendMessage(`New top 1 ${mess}: ${username}, price: ${price}`, "-1002517867301");
            // console.log(`New top 1 ${mess}: ${username}, price: ${price}`);
            return { top: username, price: price };
        }

    } catch (error) {
        console.error(`Error fetching ${mess} data:`, error.message);
    }
    return { top: currentTop, price: currentPrice };
}

async function checkPrices() {
    let adobeData = await getTop1(url_adobe, "Adobe", top1Adobe, priceAdobe);
    let chatgptData = await getTop1(url_chatgpt, "ChatGPT", top1Chatgpt, priceChatgpt);

    top1Adobe = adobeData.top;
    priceAdobe = adobeData.price;

    top1Chatgpt = chatgptData.top;
    priceChatgpt = chatgptData.price;
}

setInterval(checkPrices, 10000);
console.log("Running...");
