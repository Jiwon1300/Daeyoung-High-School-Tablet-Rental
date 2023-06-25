import express from 'express'
import firebase from './firebase.js'
import { getFirestore } from 'firebase-admin/firestore'
const firestore = getFirestore()
const router = express.Router()



// 태블릿 대여 정보를 가져오는 api
router.get('/getrentalinfo/:id',(req,res)=>{
    if(req.params.id != null){
        
    }
})

router.post('/startrental',(req,res)=>{
    if(req.body.rentalData != null){
        
        firestore.collection("tabletCase").doc(`${req.body.rentalData.tabletCaseID}`).collection("tablets").doc(`${req.body.rentalData.tabletId}`).update({
            isLock:false,
            isRental:true,
            rentalPeriod:req.body.rentalData.rentalPeriod,
            rentalUser:req.body.rentalData.studentId
        }).then(()=>{
            firebase.messaging().send({
                topic:`${req.body.rentalData.tabletId}`,
                data:{
                    title:"lockTablet",
                    body:"false"
                }
            }).then(async (firebaseResponse)=>{
                firestore.collection("students").doc(`${req.body.rentalData.studentId}`).update({
                    isRental:true
                })
                res.sendStatus(200)
            }).catch(error=>{
                res.sendStatus(500)
                console.log(error)
            })
        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
            
        })
    }
})

router.post('/locktablet',(req,res)=>{
    if(req.body.id != null){
        firebase.messaging().send({
            topic:`${req.body.id}`,
            data:{
                title:"lockTablet",
                body:`${req.body.isLock}`
            }
        }).then((firebaseResponse)=>{
            console.log(firebaseResponse)
            
            res.sendStatus(200)
        }).catch(error=>{
            res.sendStatus(500)
            console.log(error)
        })
    }
});

router.get('/gettabletcase',async (req,res)=>{
    const tabletCases = await firestore.collection("tabletCase").get()
    const cases = []
    tabletCases.docs.forEach(tabletCase=>{
        cases.push(tabletCase.id)
    })
    res.status(200).send(cases)
})

router.get('/gettablets',async(req,res)=>{
    const tablet = await firestore.collection("tabletCase").doc(`${req.query.case}`).collection("tablets").get()
    const tablets = []
    await tablet.docs.forEach(async tablet=>{
        await tablets.push({
            "tabletId":tablet.id,
            "tabletRental":await tablet.data().isRental

        })
    })
    res.status(200).send(tablets)
})



export default router;