// import {useContext} from 'react' //-> to use context
// import {context} from '../context/authContext'
import { useAuth } from "../context/authContext";

// import {useNavigate} from 'react-router-dom'
export function Home() {
  const { user, logout, loading} = useAuth();

  // const navigate = useNavigate();
  // const authContext = useContext(context);

  console.log(user);
  const handleLogOut = async () => {
 try {
  await logout()
  // navigate('/login'); // that login redirection is not necesary with ProtectedRoute.js.
 } catch (error) {

  console.error(error.message );  
 }
  }

  if(loading) return <h1>loading</h1> 

  return (
    
    <div className="w-full max-w-xs m-auto text-black">
      <div className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
      <h1 className="text-xl mb-4">{user.displayName || user.email}</h1>
      <img src={user.photoURL} alt="#"/>
      <button className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4" onClick={handleLogOut}>
        Logout
      </button>
      </div>
    </div>
    
  );
}
