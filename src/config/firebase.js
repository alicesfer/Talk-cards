import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCYLLBSOVwEzMLVAVy3m3kpTslPR9xsCSU",
    authDomain: "eventos-1f561.firebaseapp.com",
    projectId: "eventos-1f561",
    storageBucket: "eventos-1f561.appspot.com",
    messagingSenderId: "802082599311",
    appId: "1:802082599311:web:c24659aae9b2f423c3dbfa"
  };
  
  // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 
 export default app;