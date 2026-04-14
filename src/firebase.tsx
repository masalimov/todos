// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: 'AIzaSyDqC6svL4VVC9_pFkirYN7RY_d3FMjKqJo',
   authDomain: 'todos-23398.firebaseapp.com',
   databaseURL: 'https://todos-23398-default-rtdb.europe-west1.firebasedatabase.app',
   projectId: 'todos-23398',
   storageBucket: 'todos-23398.firebasestorage.app',
   messagingSenderId: '374488510148',
   appId: '1:374488510148:web:3e5e6655879c110a752391',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
