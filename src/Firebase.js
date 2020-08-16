import firebase from 'firebase';

const firebaseConfig = {
apiKey: "AIzaSyAIVyEKx0TaLM9W9tsioXqA9wywjph1b48",
authDomain: "notap-78215.firebaseapp.com",
databaseURL: "https://notap-78215.firebaseio.com",
projectId: "notap-78215",
storageBucket: "notap-78215.appspot.com",
messagingSenderId: "507164732546",
appId: "1:507164732546:web:ddcf35eeaa33f413fb589b",
measurementId: "G-WNXWTQK8WK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;