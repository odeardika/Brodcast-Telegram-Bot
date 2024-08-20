import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();
import { addGroup, getAllTime, getGroups, getMassageBySlot, setMSG, setMSGTime, setMSGWithCaption, setTimeInSlot } from "../databases/query.js";
import cron from "node-cron";

export const bot = new TelegramBot(process.env.TOKEN, { polling: true });

export const handleSetMassage = (data, chatId, userState, bot) => {
    if (data === "set_msg_1") {
        bot.sendMessage(chatId, "Please set message 1: ");
        userState[chatId] = "set_msg_1";
    }else if (data === "set_msg_2") {
        bot.sendMessage(chatId, "Please set message 2: ");
        userState[chatId] = "set_msg_2";
    }else if (data === "set_msg_3") {
        bot.sendMessage(chatId, "Please set message 3: ");
        userState[chatId] = "set_msg_3";
    }
};

export const handleSetTime = (data, chatId, userState, bot) => {
    if (data === "msg_1_time") {
        bot.sendMessage(chatId, "Please set time 1: ");
        userState[chatId] = "msg_1_time";
    }else if (data === "msg_2_time") {
        bot.sendMessage(chatId, "Please set time 2: ");
        userState[chatId] = "msg_2_time";
    }else if (data === "msg_3_time") {
        bot.sendMessage(chatId, "Please set time 3: ");
        userState[chatId] = "msg_3_time";
    }

}

export const handleSetTimeSlot = (data, chatId, userState, bot, slot) => {
    if (data === `msg1_time_slot_${slot}`) {
        bot.sendMessage(chatId, `Please set time msg 1 slot ${slot} : `);
        userState[chatId] = `msg1_time_slot_${slot}`;
    }else if (data === `msg2_time_slot_${slot}`) {
        bot.sendMessage(chatId, `Please set time msg 2 slot ${slot} : `);
        userState[chatId] = `msg2_time_slot_${slot}`;
    }else if (data === `msg3_time_slot_${slot}`) {
        bot.sendMessage(chatId, `Please set time msg 3 slot ${slot} : `);
        userState[chatId] = `msg3_time_slot_${slot}`;
    }

}

export const handleSetMSGCallback = (msg,slot, userState) => {
    if (msg.text) {
        setMSG(msg.text, 'text', slot);
        bot.sendMessage(msg.chat.id, `Message ${slot} set successfully`);
    }else if (msg.document.mime_type === 'video/mp4') {
        if(msg.caption) {
            setMSGWithCaption(msg.document.file_id, msg.caption, 'video_caption', slot);
        } else {
            setMSG(msg.document.file_id, 'video', slot);
        }
        bot.sendMessage(msg.chat.id, `Message ${slot} set successfully`);
    } else if (msg.photo) {
        if(msg.caption) {
            setMSGWithCaption(msg.photo[msg.photo.length - 1].file_id, msg.caption, 'photo_caption', slot);
        } else {
            setMSG(msg.photo[msg.photo.length - 1].file_id, 'photo', slot);
        }
        bot.sendMessage(msg.chat.id, `Message ${slot} set successfully`);
    } else {
        console.log('Uknown message type');
        console.log(msg);
        bot.sendMessage(msg.chat.id, `Message ${slot} failed to set`);

    }
    delete userState[msg.chat.id];
}

export const handleMSGTimeCallback = (msg, slot, userState) => {
    const times = msg.text.split(',');
    
    for (let i = 0; i < 4; i++) {
        setMSGTime(times[i].trim(), i+1, slot);
    }

    bot.sendMessage(msg.chat.id, `Time MSG ${slot} set successfully`);

    handleSchedule();

    delete userState[msg.chat.id];
};

export const handleSetTimeSlotCallback = (msg, slot, msg_slot, userState) => {
    setTimeInSlot(msg.text, slot, msg_slot);
    
    bot.sendMessage(msg.chat.id, `Time ${slot} MSG ${msg_slot} changed successfully`);

    handleSchedule();

    delete userState[msg.chat.id];
}

export const handleSchedule = async () => {
    const time_slots = await getAllTime();

    time_slots.forEach(time => {
        const arg = time.time.split('.');
        const cronTime = `${parseInt(arg[1])} ${parseInt(arg[0])} * * *`;

        cron.schedule(cronTime, async () => {
                try {
                    const message = await getMassageBySlot(time.msg_slot);
                    const groups = await getGroups();
    
                    groups.forEach(group => {
                        const groupId = group.group_id;
                        if (message[0].type === 'text') {
                            bot.sendMessage(groupId, message[0].content);
                        } else if (message[0].type === 'video') {
                            bot.sendVideo(groupId, message[0].content, {contentType: 'video/mp4'});
                        } else if (message[0].type === 'photo') {
                            bot.sendPhoto(groupId, message[0].content);
                        } else if (message[0].type === 'video_caption') {
                            bot.sendVideo(groupId, message[0].content, {caption: message[0].caption, contentType: 'video/mp4'});
                        } else if (message[0].type === 'photo_caption') {
                            bot.sendPhoto(groupId, message[0].content, {caption: message[0].caption});
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
            }
        )
    })
}

export const handleGroups = (msg) => {
    const chatId = msg.chat.id;
    const groupName = msg.chat.title;

    if (groupName) {
        addGroup(groupName, chatId);
    }
}

export const RunningSchedule = async () => {
    const groups = await getGroups();
    groups.forEach(group => {

        handleSchedule(group.group_id);
    });
};

export const handleGetMSG = async (slot) => {
    const message = await getMassageBySlot(slot);
    return message;
}

export const getAllGroups = async () => {
    const groups = await getGroups();

    return groups;
}

export const getAllTimeSlots = async () => {
    const time_slots = await getAllTime();

    return time_slots;
}
