
import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
import onError from "./handlers/onError.js";
import onProfile from "./handlers/onProfile.js";
import onStart from "./handlers/onStart.js";


config();


export const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

const CHANNEL_ID = "@bektrdiyeva";
const checkIfUserSubscribed = async (chatId) => {
    try {
        const chatMember = await bot.getChatMember(CHANNEL_ID, chatId);
        console.log(chatMember.status);


        if (chatMember.status == "left" || chatMember.status == "kicked") {
            return false;
        } else {
            return true;
        }


    } catch {
        console.log("error: chatMember checking");

    }
};



bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    const firstname = msg.chat.first_name;
    const text = msg.text;

    const user_subscribed = await checkIfUserSubscribed(chatId);

    console.log(user_subscribed);

    if (user_subscribed == false) {
        return bot.sendMessage(
            chatId,
            `Hurmatli ${firstname}, \nSiz botimizdan foydalanishingiz uchun oldin quyidagi kanalga obuna bo'lishing garak... 👇`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                text: `Bekturdiyeva Soliyajon`,
                                url: "https://t.me/bektrdiyeva",
                            },
                        ],
                        [
                            {
                                text: `Obunani tekshirish ✅`,
                                callback_data: "confirm_subscribtion",
                            },
                        ],
                    ],
                },
            }
        );
    }


    if (text == "/start") {
        return onStart(msg);
    }

    if (text == "/profile") {
        return onProfile(msg);
    }

    return onError(msg);
});

bot.on("callback_query", async (query) => {
    const msg = query.message;
    const data = query.data;
    const queryId = query.id;

    const chatId = msg.chat.id;
    const firstname = msg.chat.first_name;

    if (data == "confirm_subscribtion") {
        console.log("TUGMA BOSILDIII");
        const user_subscribed = await checkIfUserSubscribed(chatId);

        if (user_subscribed == false) {
            return bot.answerCallbackQuery(queryId, {
                text: "Siz hali obuna bo'lmadingiz... ❌",
            });
        } else {
            bot.deleteMessage(chatId, msg.message_id);
            return onStart(msg);
        }
    }
});

console.log("Bot ishga tushdi...");

// export { bot };









console.log("Dastur ishlayapti...");



