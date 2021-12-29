import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const config = {
    apiKey: process.env.VUE_APP_BACKEND_API_KEY,
    authDomain: "rick-backend.firebaseapp.com",
    databaseURL: "https://rick-backend-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rick-backend",
    storageBucket: "rick-backend.appspot.com",
    messagingSenderId: "669470690290",
    appId: "1:669470690290:web:f3b64f5fecaed83f17796b"
};
const firebaseApp = initializeApp(config)
const firestore = getFirestore(firebaseApp)

export default firestore