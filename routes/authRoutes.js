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
        // 此处为了政治中立性和对任何政治立场的推友的友好性删除部分注释内容
        // 如果被gitcode非法fork将会采取其他措施
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