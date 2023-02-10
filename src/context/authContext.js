import { useState, createContext, useContext, useEffect } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateCurrentUser, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase'

export const authContext = createContext();

export const useAuth = () => { //-> useAuth export singUp function, because the function is under the context (value= {{authContext}})
   const context = useContext(authContext);
   if(!context) throw new Error ('There is not auth provider')
   return context; 
}

export function AuthProvider ({children}) {
    // const user = {
    //     login: true,
    //     email:'juampi_boada@gmail.com'
    // }

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    const signup =  (email, password) => {
        // console.log(email, password);
       createUserWithEmailAndPassword(auth, email, password)
    }

    const login =  async (email, password) => {
    const userInfo = await signInWithEmailAndPassword(auth, email, password)
     console.log(userInfo);
     console.log(auth);
    }
    
    const logOut = () => signOut(auth); 

    const loginWithGoogle = () => {
      const googleProvider = new GoogleAuthProvider()
      return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
      onAuthStateChanged(auth, currentUser => {
        // console.log(currentUser);
        setUser(currentUser); // all user data will storage in user thanks the state actualization (setUser function that update the hook useState (user))
        setLoading(false);
      })
    
    }, [])
    
    //now, every context.Provider children can access to user (all value data)
    return (
        <authContext.Provider value={{ signup, login, user, logOut, loading, loginWithGoogle }}> 
            {children} 
        </authContext.Provider>
    ) 
}


