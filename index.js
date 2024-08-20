import { 
    bot,
    handleSetMassage,
    handleSetTime,
    handleSetTimeSlot,
    handleSetMSGCallback,
    handleMSGTimeCallback,
    handleSetTimeSlotCallback,
    handleGroups
} from "./bot/bot.js";
const userState = {};

bot.onText(/\/start/, (msg) => {
    const options = {
        reply_markup: {
            inline_keyboard: [
                [
                    {text : "Set MSG 1", callback_data: "set_msg_1"},
                    {text : "Set MSG 2", callback_data: "set_msg_2"},
                    {text : "Set MSG 3", callback_data: "set_msg_3"},
                ],
                [
                    {text : "MSG 1 Time", callback_data: "msg_1_time"},
                    {text : "MSG 2 Time", callback_data: "msg_2_time"},
                    {text : "MSG 3 Time", callback_data: "msg_3_time"},
                ],
                [
                    {text : "MSG1 Time slot 1", callback_data: "msg1_time_slot_1"},
                    {text : "MSG2 Time slot 1", callback_data: "msg2_time_slot_1"},
                    {text : "MSG3 Time slot 1", callback_data: "msg3_time_slot_1"},
                ],
                [
                    {text : "MSG1 Time slot 2", callback_data: "msg1_time_slot_2"},
                    {text : "MSG2 Time slot 2", callback_data: "msg2_time_slot_2"},
                    {text : "MSG3 Time slot 2", callback_data: "msg3_time_slot_2"},
                ],
                [
                    {text : "MSG1 Time slot 3", callback_data: "msg1_time_slot_3"},
                    {text : "MSG2 Time slot 3", callback_data: "msg2_time_slot_3"},
                    {text : "MSG3 Time slot 3", callback_data: "msg3_time_slot_3"},
                ],
                [
                    {text : "MSG1 Time slot 4", callback_data: "msg1_time_slot_4"},
                    {text : "MSG2 Time slot 4", callback_data: "msg2_time_slot_4"},
                    {text : "MSG3 Time slot 4", callback_data: "msg3_time_slot_4"},
                ]
            ]
        }
    }
    bot.sendMessage(msg.chat.id, "Bot Main Menu :", options);
});

bot.on("callback_query", (callbackQuery) => {
    const message = callbackQuery.message;
    const chatId = message.chat.id;
    const data = callbackQuery.data;

    handleSetMassage(data, chatId, userState, bot);
    handleSetTime(data, chatId, userState, bot);
    handleSetTimeSlot(data, chatId, userState, bot, '1');
    handleSetTimeSlot(data, chatId, userState, bot, '2');
    handleSetTimeSlot(data, chatId, userState, bot, '3');
    handleSetTimeSlot(data, chatId, userState, bot, '4');
})

bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    switch (userState[chatId]) {
        case 'set_msg_1':
            handleSetMSGCallback(msg, '1', userState);
            break;
        case 'set_msg_2':
            handleSetMSGCallback(msg, '2', userState);
            break;
        case 'set_msg_3':
            handleSetMSGCallback(msg, '3', userState);
            break;
        case 'msg_1_time':
            handleMSGTimeCallback(msg, '1', userState);
            break;
        case 'msg_2_time':
            handleMSGTimeCallback(msg, '2', userState);
            break;
        case 'msg_3_time':
            handleMSGTimeCallback(msg, '3', userState);
            break;
        case 'msg1_time_slot_1':
            handleSetTimeSlotCallback(msg, '1', '1', userState);
            break;
        case 'msg2_time_slot_1':
            handleSetTimeSlotCallback(msg, '1', '2', userState);
            break;
        case 'msg3_time_slot_1':
            handleSetTimeSlotCallback(msg, '1', '3', userState);
            break;
        case 'msg1_time_slot_2':
            handleSetTimeSlotCallback(msg, '2', '1', userState);
            break;
        case 'msg2_time_slot_2':
            handleSetTimeSlotCallback(msg, '2', '2', userState);
            break;
        case 'msg3_time_slot_2':
            handleSetTimeSlotCallback(msg, '2', '3', userState);
            break;
        case 'msg1_time_slot_3':
            handleSetTimeSlotCallback(msg, '3', '1', userState);
            break;
        case 'msg2_time_slot_3':
            handleSetTimeSlotCallback(msg, '3', '2', userState);
            break;
        case 'msg3_time_slot_3':
            handleSetTimeSlotCallback(msg, '3', '3', userState);
            break;
        case 'msg1_time_slot_4':
            handleSetTimeSlotCallback(msg, '4', '1', userState);
            break;
        case 'msg2_time_slot_4':
            handleSetTimeSlotCallback(msg, '4', '2', userState);
            break;
        case 'msg3_time_slot_4':
            handleSetTimeSlotCallback(msg, '4', '3', userState);
            break;
        default:
            break;
    }
})

bot.on("message", (msg) => {
    handleGroups(msg);
})