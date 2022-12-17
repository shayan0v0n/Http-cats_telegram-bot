"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const httpStatus_1 = __importDefault(require("./httpStatus"));
const token = '5880348343:AAFXY_vUwATQ7Q9uO3T1N2UWZgXiSy-qU70';
const TBot = new node_telegram_bot_api_1.default(token, { polling: true });
TBot.onText(/\/start/, (msg) => {
    if (msg.from) {
        const firstName = msg.from.first_name ? msg.from.first_name : '';
        const lastName = msg.from.last_name ? msg.from.last_name : '';
        const mergeHttpStatus = [['Random'], ...httpStatus_1.default];
        TBot.sendMessage(msg.from.id, `Hello ${firstName} ${lastName}`);
        TBot.sendMessage(msg.from.id, 'Please Choose Your HTTP Req:)', {
            reply_markup: {
                keyboard: mergeHttpStatus
            }
        });
    }
});
TBot.on('message', (msg) => {
    if (msg.from && msg.text !== '/start') {
        if (msg.text == 'Random') {
            const randomNumberOne = Math.round(Math.random() * 5);
            const randomNumberTwo = Math.round(Math.random() * 2);
            const currentRandomStatus = httpStatus_1.default[randomNumberOne][randomNumberTwo];
            console.log(`currentRandomStatus is: ${currentRandomStatus} From ${msg.from.first_name}`);
            TBot.sendPhoto(msg.from.id, `./assets/${currentRandomStatus}.jpeg`);
        }
        else {
            const mergedHttps = httpStatus_1.default.flat(1);
            const checkUserReqExist = mergedHttps.findIndex((item) => {
                return item === msg.text;
            });
            if (checkUserReqExist !== -1) {
                console.log(`directHttp is: ${msg.text} From ${msg.from.first_name}`);
                TBot.sendPhoto(msg.from.id, `./assets/${msg.text}.jpeg`);
            }
            else {
                TBot.sendPhoto(msg.from.id, `./assets/404.jpeg`);
            }
        }
    }
});
console.log("Successfully Done Everything...");
