import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../store/authSlice";


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
       
    };
    return <nav className="navbar navbar-expand-sm navbar-dark custom-color-navbar">
        <div className="navbar-brand">
            <h4>Medica</h4>
        </div>
        <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className="collapse navbar-collapse mr-auto"
        id="navbarNav"
        style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>
                <li className="nav-item">
                <NavLink to={"/doctorlistingpage"} className="nav-link">
                    Home
                </NavLink>
                </li>
                <li className="nav-item">
                <NavLink to={"/myappointments"} className="nav-link">
                    My Appointments
                </NavLink>
                </li>
                 <li className="nav-item">
                <NavLink to={"/changepassword"} className="nav-link">
                    Change Password
                </NavLink>
                </li>
                  {user?
                        <li className="nav-item">
                            <span className="nav-link" onClick={handleLogout}>Logout</span>
                        </li>:
                <li className="nav-item">
                    <NavLink 
                    to={"/login"} 
                    className={
                        'nav-link '+
                        (status => status.isActive ? 'active' : '')
                    } 
                    >
                    Login
                    </NavLink>
                </li>
            }
            </ul>
       </div>
    </nav>;
}
     

export default Navbar;