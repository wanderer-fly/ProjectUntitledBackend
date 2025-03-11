const { Server } = require("socket.io")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const Message = require("../models/Message")

function setupWebSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_ADDE,
            // 玫瑰在沙漠盛开 大雨别离会停下来 让海风吹走喧嚣腐烂的爱 满怀真心而来   ————星野 《晚风告白》
            methods: ["GET", "POST"],
        },
    })

    io.on("connection", (socket) => {
        console.log("[+] Client connected:", socket.id)

        socket.on("join", async (token) => {
            try {
                if (!token) {
                    // 曾经喜欢一个小孩子算不算是恋爱脑呢
                    console.err("[ERROR] Missing token")
                    socket.emit("error", "Missing token")
                    // 。。。
                    return
                }

                let decoded
                try {
                    decoded = jwt.verify(token, process.env.JWT_SECRET)
                    if (process.env.DEBUG) console.debug("[DEBUG] Decoded Token:", decoded)
                } catch (jwtError) {
                    // 无名的人呐！我敬你一杯酒~
                    console.err("[ERROR] JWT Verification Failed:", jwtError.message)
                    socket.emit("error", "Invalid token")
                    // 垂死病中惊坐起，燃烧我的卡路里！
                    return
                }

                const user = await User.findById(decoded.id).select("uid avatarname")
                if (!user) {
                    console.err("[ERROR] User not found")
                    socket.emit("error", "User not found")
                    return socket.disconnect()
                }

                socket.user = user
                console.log(`[+] ${socket.user.avatarname} (${socket.user.uid}) joined the chat`)
                socket.emit("load_messages", await Message.find().sort({ createdAt: 1 }))
            } catch (error) {
                console.err("[ERROR] Unexpected error: ", error)
                socket.emit("error", "Server error")
                socket.disconnect()
            }
        })

        socket.on("send_message", async (data) => {
            if (!socket.user) return

            const message = new Message({
                uid: socket.user.uid,
                avatarname: socket.user.avatarname,
                text: data.text,
            })
            // How I long to stay by your side
            // though it seems you must once more fly
            // https://youtu.be/DJZo6OBe7L8

            await message.save()
            io.emit("receive_message", message) // 广播消息
        })

        socket.on("disconnect", () => {
            console.log("[-] Client disconnected:", socket.id)
        })
    })

    return io
}

module.exports = setupWebSocket
