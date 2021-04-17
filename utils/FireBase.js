// FireBase
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAbujiVwpX3J3fdskNB4RJROaGk2v_Wpds",
    authDomain: "streller-3467d.firebaseapp.com",
    databaseURL: "https://streller-3467d-default-rtdb.firebaseio.com",
    projectId: "streller-3467d",
    storageBucket: "streller-3467d.appspot.com",
    messagingSenderId: "871802536435",
    appId: "1:871802536435:web:88cb4cccdafc0cdb361286",
    measurementId: "G-FXPYF4492Q"
};



export default class FireBase {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    //Function to Add to RDBS
    addButtonRDBS(userId) {
        firebase
            .database()
            .ref('Controller/' + userId)
            .set({
                type: 'large', 
                id: '3', 
                titles: ['1'], 
                msg: ['Hello']
            });
    }
    addUser(email) {
        firebase
            .database()
            .ref('Users/')
            .set({
                userId: email,
            });
    }

    

}