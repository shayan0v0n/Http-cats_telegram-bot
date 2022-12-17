import Telegram from 'node-telegram-bot-api'
import httpStatus from './httpStatus'
const token:string = '5880348343:AAFXY_vUwATQ7Q9uO3T1N2UWZgXiSy-qU70'

const TBot:any = new Telegram(token, {polling: true})

TBot.onText(/\/start/, (msg:Telegram.Message):void => {
    if (msg.from) {
        const firstName:string = msg.from.first_name ? msg.from.first_name : ''
        const lastName:string = msg.from.last_name ? msg.from.last_name : ''
        const mergeHttpStatus: string[][] = [['Random'], ...httpStatus]

        TBot.sendMessage(msg.from.id, `Hello ${firstName} ${lastName}`)
        TBot.sendMessage(msg.from.id, 'Please Choose Your HTTP Req:)', {
            reply_markup: {
                keyboard: mergeHttpStatus
            }
        });
    }
})

TBot.on('message', (msg:Telegram.Message):void => {
    if (msg.from && msg.text !== '/start') { 
        if (msg.text == 'Random') {
            const randomNumberOne:number = Math.round(Math.random() * 5)
            const randomNumberTwo:number = Math.round(Math.random() * 2)
            const currentRandomStatus = httpStatus[randomNumberOne][randomNumberTwo];
            console.log(`currentRandomStatus is: ${currentRandomStatus} From ${msg.from.first_name}`);
            TBot.sendPhoto(msg.from.id, `./assets/${currentRandomStatus}.jpeg`)
        }else {
            const mergedHttps = httpStatus.flat(1)

            const checkUserReqExist = mergedHttps.findIndex((item:string) => {
                return item === msg.text
            })

            if (checkUserReqExist !== -1) {
                console.log(`directHttp is: ${msg.text} From ${msg.from.first_name}`);
                TBot.sendPhoto(msg.from.id, `./assets/${msg.text}.jpeg`)
            }else {
                TBot.sendPhoto(msg.from.id, `./assets/404.jpeg`)
            }
        } 
    }
})

console.log("Successfully Done Everything...");