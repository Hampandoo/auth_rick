import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore"

const config = {
    apiKey: "AIzaSyB6Ya19qGtzhrAf6YyZUFrVnPj_-iEm0u4",
    authDomain: "rick-backend.firebaseapp.com",
    databaseURL: "https://rick-backend-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rick-backend",
    storageBucket: "rick-backend.appspot.com",
    messagingSenderId: "669470690290",
    appId: "1:669470690290:web:f3b64f5fecaed83f17796b"
    // test
};
const firebaseApp = initializeApp(config)
const firestore = getFirestore(firebaseApp)

export default firestore