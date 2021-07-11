// import { firebaseConfig } from "../firebaseConfig";

export const googleSignIn = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
      document.querySelector(`.icon-logout`).style.visibility = "visible";
      document.querySelector(`.icon-login`).style.visibility = "hidden";

      console.log(result);
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
    })
    .catch((error) => {
      console.log(error);
      console.log("error in authentication");
    });
};
