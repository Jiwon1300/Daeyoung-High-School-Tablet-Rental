import express from 'express'
// import firebase from './firebase'
import { getFirestore } from 'firebase-admin/firestore'

const router = express.Router()
const db = getFirestore()


// 학생 정보를 가져오는 함수
/*
    
    id : 학번
    name : 학생이름

*/
router.get('/getstudent/:id/:name', async (req, res) => {
    if (req.params.id != null && req.params.name != null) {
        const studentData = await db.collection("students").doc(`${req.params.id}`).get()
        if (studentData.data() != null) {
            if (studentData.data().name == req.params.name) {
                res.status(200).send({isRental:studentData.data().isRental,
                    isRestrict:studentData.data().isRestrict})
            } else res.status(400).send("Not Found Student")
        } else res.status(400).send("Not Found Student")

    }
})

router.get('/getstudentrental/:id', async (req, res) => {
    if (req.params.id != null) {

    }
})


export default router