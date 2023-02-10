## -- STEP BY STEP -- 

### Project setUp

### React Router Dom

### Context API

### User registration

### User login (similar registration)
1) copy register component code
2) create login funtion in authContext.js
  - import signInwithEmailAndPassword from firebase to use inside login function.
3) in authContext.js, export login function (insert into authContext.Provider value (value={{login}})
4) import login function in Login.js (const {Login} = useAuth()).
5) in handleSubmit function, replace singup function name to login 
6) change the buttom name to login 
7) signInWithEmailAndPassword function returns an object (userCredential object), which has a lot of user value information about. That info must be storage to use then. Check out -> console.log(UserCredential); --> to console it, it must be manage as a promise cause is an async function (a request)-(with asyncs and await)

8) import onAuthStateChanged from firebase: this firebase function notice when authentication state changes (when user login or logout), it returns the state; as an event trigger. Because that, is importat to call it inside an useEffect because useEffect is executed as soon as the component is loaded. 
  - call useEffect in authContext.js
  - call onAuthStateChanged(auth, currentUser){} function in the useEffect, it will be show user info if the user is loged; if not, it will return null. This function is a listener
  - storage onAuthStateChanged info in a variable (state in react ) on authProvider (const [user, setUser] = useState(null);) 
  - then, call setUser in the useEffect hook to actualice the state user with all the user data from currenteUser(parameter of the function listerter onAuthStateChanged) (all of that inside authContext.Provider, for all components have global access to user info (onAuthStateChange -> currentUser))

    useEffect(() => {
      onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
      })
    }, [])

  - Now, user state can be passed to authContext.Provider value:
    <authContext.Provider value={{ signUp, login, user }}> 
        {children} 
    </authContext.Provider>
9) Now, we can use the userData storaged in the state, passed throuth the authContext to use in home component. 
  - In home component, import useAuth hook and destructuring necesary info (user):
  import {useAuth} from '../context/authContext'
  const {user} = useAuth().
10) Creat logOut function on authContext
  - this function will execute a firebase function (singOut) that will recibe as parameter the auth firebase object
  - Import singOut function from firebase
  - create own logOut function --> const logOut = () => signOut(auth); 
  - pass it through authContext.Porvider value
  - import it in home.js the useAuth hook -> const { user, logOut } = useAuth(); remember that useAuth return all context info; its a custom hook to simplify exporting context info (?)
  - create a handle function in home.js (remember develop it as a promise/request function with async and await)
    const handleLogOut = async () => {
     await logOut()
  }
  - import useNavigate from react-router-dom and call it to redirect to login after logout
  - create loading state in authContext -->  const [loading, setLoading] = useState(true)
  - pass it through authContext.Porvider value
    resolving the undefined user access: react al renderizar, quiere acceder a varibales que no existen(?)
  - import loading in home.js --> user undefined cut execution? what is the sense of loading?(?)
    resolving:
  - When logOut is executed, the setUser is actualized to null. After logOut,  an undefined user error occurs, because user after logOut is null. To fix it, buil a proyected route. 
11) Create protecter route : this component will englobe all user private components; only authenticated user can acces to them. The idea is to prove that user object exist, if not, login redirection will happens. If user exist, it renderize the element (children).
  - in ProtectedRoute, there will be components that only autheticated users will be able to access. 
  - now, it is not necessary de login rediction in Home (delete useNavigate) because, logOut will update the user state to NULL (current user will stablish user in NULL).So, with this conditional in proctedRoute -> if(!user) return <Navigate to='/login'/>, the login redirection happens when user state be null (import Navigate from 'react-router-dom'-> import {Navigate} from 'react-router-dom', to return a component and redirection to login -> if(!user) return <Navigate to='/login'/> ). In other words, if there is an unauthenticated user in home, will be redirected to login. (investigate {children} prop)(?)
- authentication flow done. from now on, firesore or firestorage (to apload files),can be added in home.js. 


### Google login
1) creat handleGoogleSingIn in login.js.
  - handleGoogleSingIn allow as call an authContext function (loginWithGoogle)
  - loginWithGoogle (created in authContext) will call at the same time a firebase function -> import from firebase/auth GoogleAuthProvider and signInWithPopup (allow user accounts selection at login). 
  - import loginWithGoogle in login.js
  - call it in handleGoogleSingIn as an async function: 
      const handleGoogleSignIn = async () => {
      await loginWithGoogle(); 
      }
  - Add Login with Google button in login.js and add an onClick function passing handleGoogleSignIn function: 
  <button onClick={ handleGoogleSignIn }>Login with Google</button>
  - update firebase login with google authentication function in firebase website (add new provider)
  - add try and catch to all async functions
2) Alert component
  - 


### Taildwin CSS

### Reset password


Issues:

- Catch is not working (user message)
