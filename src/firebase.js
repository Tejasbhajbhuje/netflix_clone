
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyA0o86nNgXdd36P3ryR5V5N6rSwNAl9BK0",
  authDomain: "netflix-clone-df2ae.firebaseapp.com",
  projectId: "netflix-clone-df2ae",
  storageBucket: "netflix-clone-df2ae.appspot.com",
  messagingSenderId: "153895203067",
  appId: "1:153895203067:web:9278defda2d3161081005e"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db =  getFirestore(app);

const signup = async (name, email, password)=>{
    try{
       const res= await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid :user.uid,
        name,
        authProvider : "local",
        email,
       })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email , password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=> {
    signOut(auth);
}

export {auth, db, login, signup, logout};