import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider ,onAuthStateChanged, createUserWithEmailAndPassword,signInWithPopup,signInWithEmailAndPassword} from "firebase/auth";
import { createContext ,useState,useEffect, useContext } from "react";

const FirebaseContext = createContext(null);
const firebaseConfig = {
  apiKey: "AIzaSyBzn9y0J6RkxbMD_7dOtrP7OXgF2oCWe8Q",
  authDomain: "user-authentication-b3305.firebaseapp.com",
  projectId: "user-authentication-b3305",
  storageBucket: "user-authentication-b3305.appspot.com",
  messagingSenderId: "634996263467",
  appId: "1:634996263467:web:48ebc6b783e93bf7d8786e",
  measurementId: "G-YWFH3Z25C8"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);


const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);
  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signinWithGoogle,
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        isLoggedIn,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};




















// export const useFirebase = ()=> useContext(FirebaseContext);
// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// export const firebaseAuth = getAuth(firebaseApp);



// export const FirebaseProvider = (props)=>{
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//       onAuthStateChanged(firebaseAuth, (user) => {
//         if (user) setUser(user);
//         else setUser(null);
//       });
//     }, []);

//     const signupUserWithEmailAndPassword = (email, password) =>
//     createUserWithEmailAndPassword(firebaseAuth, email, password);
    
//     const singinUserWithEmailAndPass = (email, password) =>
//      signInWithEmailAndPassword(firebaseAuth, email, password);
//   const provider = new GoogleAuthProvider();
//     // const signInWithGoogle = () =>signInWithPopup(firebaseAuth ,provider);

//     const isLoggedIn =user? true:false;
//     return (
//     <FirebaseContext.Provider value={{isLoggedIn,signupUserWithEmailAndPassword, singinUserWithEmailAndPass}}>{props.childern}</FirebaseContext.Provider>)
// }


