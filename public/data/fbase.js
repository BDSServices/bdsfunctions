import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-functions.js";

const firebaseConfig = {
  apiKey: "AIzaSyDXomAZxkN2HgEM1esMOah0siRy99uFFys",
  authDomain: "bdsfunctions.firebaseapp.com",
  projectId: "bdsfunctions",
  storageBucket: "bdsfunctions.appspot.com",
  messagingSenderId: "709869307845",
  appId: "1:709869307845:web:565f6cecc915a11db7adac",
  measurementId: "G-DCTMF1KVYL"
};

// Initialize Firebase
export const fbapp = initializeApp(firebaseConfig);
export const functions = getFunctions(fbapp);
export const auth = getAuth(fbapp);

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(`${user.email} logged in!`)
    } else {
      // User is signed out
      console.log(`User logged out!`)
      
    }
  });

// const btn = document.querySelector(".call");
// btn.addEventListener("click", (e) => {
//   const hw = httpsCallable(functions, "sayHello");
//   hw({name: "Madhu"}).then(result => {
// 	alert(result.data);
//   });
// });