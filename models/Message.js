const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema(
    {
        uid: { type: String, required: true },
        avatarname: { type: String },
        text: { type: String, required: true },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Message", MessageSchema)

// 哎呀菩萨呀菩萨呀~~~我勒个观世音傻逼菩萨呀 哈哈哈哈哈哈哈哈哈哈哈
// MongoDB=神 MySQL=屎