import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";



export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
        .auth()
        .signInWithPopup(provider)
        .then((res) => {
            const { displayName, email, photoURL } = res.user;

            const signInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL,
                success: true
            };
            return signInUser;

            //console.log(displayName, email, photoURL);
        });



    // .catch(err => {
    //     console.log(err);
    //     console.log(err.message);
    // })
};


export const handleSignOut = () => {
    return firebase
        .auth()
        .signOut()
        .then((res) => {
            const signOutUser = {
                isSignedIn: false,
                name: "",
                photo: "",
                email: "",
                error: "",
                success: false,
            };
            return signOutUser;
        })
        .catch((err) => {});
};


export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
            // Signed in
            const newUserInfo = res.user;
            newUserInfo.error = " ";
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
            // ...
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;

            // var errorCode = error.code;
            //var errorMessage = error.message;

            // ..
        });
}


export const signInWithEmailAndPassword = (email, password) => {
    return firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
            const newUserInfo = res.user;
            newUserInfo.error = " ";
            newUserInfo.success = true;
            return newUserInfo;
            // Signed in
            //var user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user
        .updateProfile({
            displayName: name,
        })
        .then(() => {
            // Update successful
            // ...
        })
        .catch((error) => {
            // An error occurred
            // ...
        });
};