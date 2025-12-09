import"./src/bot.js";
console.log("bot ishga tushdi...");
import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onError from "./handlers/onError.js";
import onProfile from "./handlers/onProfile.js";
import onStart from "./handlers/onStart.js";


config();


export const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true});
bot.on("message",(msg)=>{
    const chatId=msg.chat.id;
    const firstname=msg.chat.first_name;
    const text = msg.text;


 if (text == "/start") {
       return onStart(msg);
  }
  if (text == "/profile") {
      return onProfile(msg);
  }
  return onError(msg);
});



console.log("Dastur ishlayapti...");



