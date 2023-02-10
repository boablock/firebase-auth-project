// import {useContext} from 'react' //-> to use context
// import {context} from '../context/authContext'
import { useAuth } from "../context/authContext";

// import {useNavigate} from 'react-router-dom'
export function Home() {
  const { user, logOut, loading} = useAuth();

  // const navigate = useNavigate();
  // const authContext = useContext(context);

  console.log(user);
  const handleLogOut = async () => {
 try {
  await logOut()
  // navigate('/login'); // that login redirection is not necesary with ProtectedRoute.js.
 } catch (error) {

  console.error(error.message );  
 }
  }

  if(loading) return <h1>loading</h1> 

  return (
    <>
      <h1>{user.displayName || user.email}</h1>
      <button onClick={handleLogOut}>
        Logout
      </button>
    </>
  );
}
