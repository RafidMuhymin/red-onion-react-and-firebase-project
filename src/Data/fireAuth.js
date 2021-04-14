import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

export const initFirebase = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const gAuth = new firebase.auth.GoogleAuthProvider();
  // prettier-ignore
  return firebase.auth().signInWithPopup(gAuth)
    .then((res) => {
      console.log(res)
      const newUser = {
        isSignedIn: true,
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL
      };
      return newUser;
    })
    .catch((err) => {
      return err;
    });
};

export const handleAccountCreation = (email, password, name) => {
  // prettier-ignore
  return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      handleUpdateProfile(name)
    })
    .catch((err) => {
      return err;
    });
};

export const handleAccountSignIn = (email, password) => {
  // prettier-ignore
  return firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res)
      const newUser = {
        isSignedIn: true,
        name: res.user.displayName,
        email: res.user.email,
        photoURL: res.user.photoURL
      };
      return newUser;
    })
    .catch((err) => {
      return err;
    });
};

export const handleSignOut = () => {
  // prettier-ignore
  return firebase.auth().signOut()
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      return err;
    });
};

export const handleUpdateProfile = (name) => {
  // prettier-ignore
  return firebase.auth().currentUser.updateProfile({
      displayName: name
    })
    .then((res) => {console.log(res)})
    .catch((err) => {
      console.log(err);
      return err;
    })
};

export const handleUpdateProfilePicture = (file) => {
  // prettier-ignore
  return firebase.auth().currentUser.updateProfile({
      photoURL: file
    })
    .then((res) => {console.log(res)})
    .catch((err) => {
      console.log(err);
      return err;
    })
};
