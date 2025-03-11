const express = require('express')
const User = require('../models/User')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
    const { uid, password, avatarname } = req.body
    if (process.env.DEBUG) console.log("[DEBUG] Request Body:", req.body)
    try {
        const user = await User.create( { uid, password, avatarname } )
        res.status(201).json({ message: "User registered successfully" })
    } catch(error) {
        res.status(400).json({ error: error.message })
        // 习近平傻逼李强傻逼毛泽东傻逼中共倒台共产党下台8964白纸革命万岁
        // 中华民国万岁 美利坚合众国万岁 乌克兰万岁
        // 匪共倒台邓小平死全家毛泽东屠杀中国人文化大革命三年大吃饱
        // 正太恋童操逼傻逼性爱10约炮同城傻逼叫爸爸
        // 光复香港时代革命大罢工天安门运动
        // 坦克人 It's my duty 赵家人死全家欠屠
        // 中共傻逼政府下台死妈习近平我操你全家
        // 青天白日满地红，中共血洗天安门
        // 华为倒闭华为狗死全家问界车祸天灾人祸CSDN全家死光光
        // 对付GitCode非法fork专用
        // 使用大量政治类词汇使GitCode后悔
    }
})

// Login
router.post('/login', async (req, res) => {
    const { uid, password } = req.body
    if (process.env.DEBUG) console.log("[DEBUG] Request Body:", req.body)
    try {
        const user = await User.findOne({ uid })
        if (!user) res.status(400).json({ error: "Invalid User ID" })
        
        const isMatched = await bcrypt.compare(password, user.password)
        if (!isMatched) return res.status(400).json({ error: "Invalid credentials" })

        // 誰能離開自己的家園 拋棄世世代代的尊嚴
        // 誰能忍心看那昨日的小丑 帶走我們的笑容
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" })
        res.json({ token })
    } catch(error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router