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
        firebase.initializeApp(firebaseConfig);
    }

    //Function to Add Button to RDBS
    addButton(userId, buttonCounter) {
        firebase
            .database()
            .ref('Users/' + userId + '/buttons/' + buttonCounter)
            .set({
                id: buttonCounter,
                type: 'large',
                titles: [
                    'Button A',
                ],
                msg: [
                    'Hello from Button A',
                ],
                img: [
                    'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                ]
            });
    }

    //Function to Remove Button From RDBS
    removeButton(userId, buttonId) {
        firebase
            .database()
            .ref('Users/' + userId + '/buttons/' + buttonId)
            .remove();
    }

    //Function to Get ALL Buttons
    getAllButtons(userId) {
        firebase
            .database()
            .ref('Users/' + userId + '/buttons')
            .once('value')
            .then(snapshot => {
                console.log('Buttons: ', snapshot.val());
            });
    }

    // TODO:
    //Function to Update Button
    // addButton(userId, buttonId, type) {
    //     firebase
    //         .database()
    //         .ref('Users/' + userId + '/buttons/' + buttonId)
    //         .update({
    //             id: buttonId,
    //             type: 'large',
    //             titles: [
    //                 'Button A',
    //             ],
    //             msg: [
    //                 'Hello from Button A',
    //             ],
    //             img: [
    //                 'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
    //             ]
    //         });
    // }

    //Function to Add User to RDBS
    addUser(email, token) {
        convertEmail = (input) => {
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
        let path = convertEmail(email);
        firebase
            .database()
            .ref('Users/' + path)
            .set({
                email: email,
                token: token,
                buttonCounter: 3,
                buttons: [
                    {
                        id: 0,
                        type: 'small',
                        titles: [
                            'Button A',
                            'Button B',
                            'Button C',
                            'Button D',
                        ],
                        msg: [
                            'Hello from Button A',
                            'Hello from Button B',
                            'Hello from Button C',
                            'Hello from Button D',
                        ],
                        img: [
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                        ]
                    },
                    {
                        id: 1,
                        type: 'medium',
                        titles: [
                            'Button A',
                            'Button B',
                        ],
                        msg: [
                            'Hello from Button A',
                            'Hello from Button B',
                        ],
                        img: [
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                        ]
                    },
                    {
                        id: 2,
                        type: 'large',
                        titles: [
                            'Button A',
                        ],
                        msg: [
                            'Hello from Button A',
                        ],
                        img: [
                            'file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540simeoni%252Fstreller/ImagePicker/88607b45-5dd4-4e3d-a9fc-413efc4c7211.png',
                        ]
                    },
                ],
            });
    }

    //Function to Remove User From RDBS
    removeUser(email) {
        convertEmail = (input) => {
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
        let path = convertEmail(email);
        firebase
            .database()
            .ref('Users/' + path)
            .remove();
    }
}