const mongoose = require('mongoose')
require("dotenv").config()

const connDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // 据说这个不用管，加上就行了
            // 突然感觉现在生活好无聊哦
            useUnifiedTopology: true,
        })

        console.log("[+] MongoDB Connected...")
    } catch(error) {
        console.error(`[-] ${error.message}`)
        process.exit(1)
    }
}

module.exports = connDB