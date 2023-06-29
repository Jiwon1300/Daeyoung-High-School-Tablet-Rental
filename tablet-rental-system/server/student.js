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
router.get('/getstudent', async (req, res) => {
    
    if (req.query.id != null && req.query.name != null) {
        const studentData = await db.collection("students").doc(`${req.query.id}`).get()
        if (studentData.exists) {
            if (studentData.data().name == req.query.name) {
                res.status(200).send({isRental:studentData.data().isRental,
                    isRestrict:studentData.data().isRestrict})
            } else res.status(400).send("Not Found Student")
        } else res.status(400).send("Not Found Student")
    }else res.status(400).send("Not Found Student")
})

router.post('/createstudent', async (req, res) => {
    if (req.params.id != null) {
        
    }
})

router.get('/studentrentaltablet',async (req,res)=>{
    if(req.query.studentId != null){
        
        const tabletCase = await db.collection("tabletCase").get()
        
        tabletCase.forEach(async (doc) =>{
            const tabletData = await doc.ref.collection("tablets").where('rentalUser','==',req.query.studentId).get()
            if(tabletData.empty) return res.status(400).send("Not  Have Tablet")
            return res.status(200).send({
                tabletId:tabletData.docs[0].id,
                tabletCaseId:doc.id
            })
            
        })
        
        
    }else res.status(400).send("Not Found Student")
})


export default router