const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // 金！将！军！！！
    password: { type: String, required: true },
    avatarname: { type: String },
})

// 奇变偶不变，火花带闪电~
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // 青天白日齐飞扬 将挚爱奉献给理想 青天白日齐飞扬 壮志重伸豪情再放 ———— 《英勇勋章》 https://youtu.be/kGDK6OxRCks
    next()
})

module.exports = mongoose.model("User", UserSchema)