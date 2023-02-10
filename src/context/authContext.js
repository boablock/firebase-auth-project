import { useState, createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const authContext = createContext();

export const useAuth = () => {
  //-> useAuth export singUp function, because the function is under the context (value= {{authContext}})
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    // console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password);
  };
  const login = async (email, password) => {
    const userInfo = await signInWithEmailAndPassword(auth, email, password);
    console.log(userInfo);
    console.log(auth);
  };

  const logout = () => signOut(auth);

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email)
  }
  useEffect(() => {
    const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log({ currentUser });
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubuscribe();
  }, []);

  //now, every context.Provider children can access to user (all value data)
  return (
    <authContext.Provider
      value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword }}
    >
      {children}
    </authContext.Provider>
  );
}
