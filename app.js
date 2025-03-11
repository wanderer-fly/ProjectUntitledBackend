const express = require("express")
const connDB = require("./config/db")
const dotenv = require("dotenv")
const cors = require("cors")
const http = require("http")
const setupWebSocket = require("./config/ws")

dotenv.config()
const app = express()
const server = http.createServer(app) // HTTP Server

console.debug(`DEBUG mode: ${process.env.DEBUG}`)

//我要去世界的尽头 留下你向梦的出口 别回头尽管往前走 就算终点没人为你等候

connDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors()) 

app.use("/api/auth", require("./routes/authRoutes"))

const PORT = process.env.PORT || 5000

setupWebSocket(server)

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
