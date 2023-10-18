import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwTf37quV2XuKOu8mVkKp7VI_CPFc6lA8",
  authDomain: "dennx-f7dc5.firebaseapp.com",
  projectId: "dennx-f7dc5",
  storageBucket: "dennx-f7dc5.appspot.com",
  messagingSenderId: "1006298883222",
  appId: "1:1006298883222:web:a7b8fdf46229000285ceb7"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };