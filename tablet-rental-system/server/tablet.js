import express from 'express'
import firebase from './firebase.js'
import { getFirestore } from 'firebase-admin/firestore'
const firestore = getFirestore()
const router = express.Router()

async function lockTablet(tabletId, isLock){
        await firebase.messaging().send({
            topic:`${tabletId}`,
            data:{
                title:"lockTablet",
                body:`${isLock}`
            }
        })
}

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
        }).then(async()=>{
            try{
                await firestore.collection("students").doc(`${req.body.rentalData.studentId}`).update({
                    isRental:true
                })
                await lockTablet(req.body.rentalData.tabletId,false)
                res.sendStatus(200)
            }catch(error){
                res.sendStatus(200)
            }
            


        }).catch((err)=>{
            console.log(err)
            res.status(500).send(err)
            
        })
    }
})

router.post('/locktablet',async (req,res)=>{
    if(req.body.id != null){
        try{
            await lockTablet(req.body.id,req.body.isLock)
            res.sendStatus(200)
        }catch(error){
            res.sendStatus(400)
        }
    }
});

router.get('/tabletdata',async(req,res)=>{
    console.log(req.query)
    if(req.query != {}){
        try{
            const beforeData = await firestore.collection('tabletCase').doc(`${req.query.tabletCaseId}`).collection('tablets').doc(`${req.query.tabletId}`).get()
            
            res.send({
                rentalUser:beforeData.data().rentalUser,
                isRental:beforeData.data().isRental,
                isCharge:beforeData.data().isCharge
            })
        }catch(error){
            res.sendStatus(400)
        }
    }else res.sendStatus(400)
})

router.post('/returnlock',async (req,res)=>{
    if(req.body != {}){
        await firestore.collection("tabletCase").doc(`${req.body.tabletCaseId}`).collection("tablets").doc(`${req.body.tabletId}`).update({
            isRental:false,
        })
    }
})

router.post('/returntablet',async (req,res)=>{
    if(req.body != {}){
        try{
            await firestore.collection("tabletCase").doc(`${req.body.tabletCaseId}`).collection("tablets").doc(`${req.body.tabletId}`).update({
                isLock:true,
                isRental:false,
                rentalPeriod:"0000-00-00",
                rentalUser:"none",
                lastRentalUser:`${req.body.studentId}`,
            })
            await firestore.collection("students").doc(`${req.body.rentalData.studentId}`).update({
                isRental:false
            })
            await lockTablet(req.body.tabletId, true)
            res.sendStatus(200)
        }catch(error){
            res.sendStatus(400)
        }
    }else res.sendStatus(500)
})

router.post('/rentalcancel',async (req,res)=>{
    if(req.body != {}){
        await firestore.collection("tabletCase").doc(`${req.body.tabletCaseId}`).collection("tablets").doc(`${req.body.tabletId}`).update({
            isRental:req.body.isCancel,
            
        })
    }else res.sendStatus(400)
})

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