import { bot } from "../bot.js";

function onStart(msg) {
  const chatId = msg.chat.id;
  const firstname = msg.chat.first_name;

  bot.sendMessage(chatId, `Assalomu aleykum , ${firstname}😊, Bu bot orqali siz 100x akademiyasidagi kurslarga online ro'yxatdan o'ta olasiz  🔥`);
}

export default onStart;