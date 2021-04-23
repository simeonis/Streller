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


//Interacting with the Firebase Realtime Database
export default class FireBase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        } else {
            firebase.app();
        }
    }

    // Function to convert email to valid ID
    convertEmail(input) {
        let output = ""
        for (var i = 0; i < input.length; i++) {
            if (input.charAt(i) === '.') {
                output += "_";
                continue;
            }
            output += input.charAt(i);
        }
        return output;
    }

    //Getting userinfo as an object
    getUserInfo(email) {
        let path = this.convertEmail(email);
        firebase
            .database()
            .ref('Users/' + path)
            .once('value')
            .then(snapshot => {
                return snapshot.val();
            });
    }

    // Function to Update User
    updateUserInfo(email, userInfo) {
        let path = this.convertEmail(email);
        firebase
            .database()
            .ref('Users/' + email)
            .update({
                userInfo,
            });
    }

    //Function to Add User to RDBS
    addUser(email) {
        let path = this.convertEmail(email);
        firebase
            .database()
            .ref('Users/' + path)
            .set({
                userInfo: {
                    buttons: [],
                    email: email,
                    token: "",
                }
            });
    }

    //Function to Remove User From RDBS
    removeUser(email) {
        let path = this.convertEmail(email);
        firebase
            .database()
            .ref('Users/' + path)
            .remove();
    }

    //Function to handle Signup
    async userSignUp(email, password) {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => { return true })
            .catch(err => {return err});
    }

    //Function to handle login
    async userLogin(email, password) {
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => { return true })
            .catch(err => {return err});
    }
}


