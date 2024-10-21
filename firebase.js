// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-analytics.js";
  import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
  import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAB3EJn-_agRd4IS-iY4McV3NcZUIkfI8I",
    authDomain: "login-e5b26.firebaseapp.com",
    projectId: "login-e5b26",
    storageBucket: "login-e5b26.appspot.com",
    messagingSenderId: "645443755921",
    appId: "1:645443755921:web:28b1ddbe645cd010604430",
    measurementId: "G-MWFNBQ40FK"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const auth = getAuth(app);
  export const db = getFirestore();

  //GuardarPost
  export const savePost = (title, description, userMail) => {
    addDoc(collection(db, "Posts"), {title, description, userMail})
  }

  //ObtenerTodosLosPost
  export const getPost = () => getDocs(collection(db, "Posts"));

  //ActualizarPostsAutomáticamente
  export const onGetPosts = (callback) => onSnapshot(collection(db, "Posts"), callback);

  export const deletePost = (id) => deleteDoc(doc(db, "Posts", id));
