import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCT9SOzLKxLMjfnueZc272Uu8YIi4JbrJo",
    authDomain: "react-native-course-4105d.firebaseapp.com",
    databaseURL: "https://react-native-course-4105d.firebaseio.com",
    projectId: "react-native-course-4105d",
    storageBucket: "react-native-course-4105d.appspot.com",
    messagingSenderId: "1024352883689",
    appId: "1:1024352883689:web:c6bd88c93fa60052fbf178",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };