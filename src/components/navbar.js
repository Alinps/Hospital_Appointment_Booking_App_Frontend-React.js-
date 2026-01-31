import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";
import "../static/css/Navbar.css"


function Navbar() {
     const navigate = useNavigate();
     let user = useSelector(store=>store.auth.user);
      const dispatch = useDispatch ();

    const handleLogout = async() =>{
        if(user){
            try{
            await axios.post("http://127.0.0.1:8000/logout/",null,{
                headers:{
                    Authorization: `Token ${user.token}`
                },
            });
            dispatch(removeUser());
            navigate("/");
        }
         catch(error){
            console.error('Logout failed:',error);
            dispatch(removeUser());
            navigate("/")
        };

        
        }
    }

       
      return (
    <nav className="navbar glass">
      <div className="navbar-left">
        <Link to="/" className="logo">
          CarePlus Hospital
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-link">
          Home
        </Link>

        {user?.token && (
          <>
            <Link to="/appointments" className="nav-link">
              My Appointments
            </Link>

            <Link to="/change-password" className="nav-link">
              Change Password
            </Link>

            <button className="btn-outline" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {!user?.token && (
          <>
            <Link to="/login" className="btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;