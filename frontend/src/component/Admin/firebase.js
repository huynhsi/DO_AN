// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
import {getApp, getApps, initializeApp} from 'firebase/app';
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";





    const firebaseConfig = {
        apiKey: "AIzaSyCL0vICuMmCECiS3VKQdFkEhHrqA9Nndns",
        authDomain: "shose-shope.firebaseapp.com",
        databaseURL: "https://shose-shope-default-rtdb.firebaseio.com",
        projectId: "shose-shope",
        storageBucket: "shose-shope.appspot.com",
        messagingSenderId: "447336252407",
        appId: "1:447336252407:web:c93ff9f556a69b521664f2"
      };


  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

  const firestore = getFirestore(app);
  const storage = getStorage(app);

  export {app, firestore, storage};