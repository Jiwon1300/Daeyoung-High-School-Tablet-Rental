import ViteExpress from 'vite-express'
import express from 'express'
import http from 'http'

import tablet from './tablet.js'
import firebase from './firebase.js'
import student from './student.js'
import { Server } from 'socket.io';
import cors from 'cors'
import axios from 'axios'

const io = new Server();

io.on('connection', (socket) => {
    console.log('클라이언트가 연결되었습니다')

    // 웹클라이언트에서 수신
    socket.on('startVerify', (data) => {
        /*
            프론트엔드 데이터 수신 -> 태블릿 지문 이동
            태블릿 케이스 정보 & 학생정보
        */
        io.emit(`startBiometricVerify`, {
            tabletCase: data.tabletCase,
            tabletId: data.tabletCase.tabletId,
            studentId: data.studentId // 추후 지문 아이디로 변경
        })
    })
    /*

        인증완료 수신
        인증완료된 태블릿 케이스 정보, 학생정보

    */
    socket.on('doneVerify', (data) => {
        io.emit(`successVerify`, { studentId: data.studentId })
        io.emit('rentalStart', { tabletCase })
    })
    socket.on('failVerify', (data) => {

    })
    socket.on('return', (data) => {
        io.emit('tabletReturn', {
            tabletId: data.tabletId,
            tabletCaseId: data.tabletCaseId,
            studentId: data.studentId
        })
    })
    socket.on('returnSuccess',(data)=>{
        axios({
            url:"/api/tablet/rentalcancel",
            method:'post',
            data:{
                tabletId:data.tabletId,
                tabletCaseId:data.tabletCaseId,
                isCancel:false
            }
        })
    })
    socket.on('tabletRentalCancel', (data) => {
        axios({
            url: '/api/tablet/returntablet',
            method:'post',
            data:{
                tabletId:data.tabletCaseId,
                studentId:data.studentId,
                tabletId:data.tabletId
            }
        })
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