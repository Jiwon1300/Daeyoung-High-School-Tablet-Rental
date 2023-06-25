import ViteExpress from 'vite-express'
import express from 'express'
import http from 'http'

import tablet from './tablet.js'
import firebase from './firebase.js'
import student from './student.js'
import { Server } from 'socket.io';
import cors from 'cors'


const io = new Server();

io.on('connection', (socket) => {
    console.log('클라이언트가 연결되었습니다')
    socket.on('startVerify', (data) => {
        /*
            프론트엔드 데이터 수신
            태블릿 케이스 정보 & 학생정보
        */
        io.emit(`tabletCase-${data.tabletCase}`, {
            tabletCase: data.tabletCase,
            studentId: data.studentId
        })
    })
    /*

        인증완료 수신
        인증완료된 태블릿 케이스 정보, 학생정보

    */
    socket.on('doneVerify', (data) => {
        io.emit(`done-${data.tabletCase}`,data.studentId)
    })
    socket.on('failVerify', (data) => {

    })
})


const app = express()
app.use(cors())
app.use(express.json());
app.use("/api/tablet", tablet)
app.use("/api/student", student)
const server = http.createServer(app).listen(3000, () => {
    console.log("Server is listening PORT 3000")
})
io.listen(3001, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})



ViteExpress.bind(app, server)