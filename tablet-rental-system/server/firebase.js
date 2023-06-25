import firebase from 'firebase-admin'
import firebasekey from './firebasekey.js'
firebase.initializeApp({
    credential:firebase.credential.cert(firebasekey)
})

export default firebase