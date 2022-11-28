import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBTlMcGn02uLDKoUsO9WBT4o9Gc7TVpXIY",
    authDomain: "node-project-8fc16.firebaseapp.com",
    projectId: "node-project-8fc16",
    storageBucket: "node-project-8fc16.appspot.com",
    messagingSenderId: "494881524139",
    appId: "1:494881524139:web:02b347943d1bdc720f2aee"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);