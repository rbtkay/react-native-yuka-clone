import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import firebaseConfig from "./env";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };