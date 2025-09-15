import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Navbar() {
     const navigate = useNavigate();

    const handleLogout = async() =>{
        const token = localStorage.getItem('token');

        try{
            await axios.post("http://127.0.0.1:8000/logout/",null,{
                headers:{
                    Authorization: `Token ${token}`
                },
            });
            localStorage.clear();
            navigate("/");
        }
        catch(error){
            console.error('Logout failed:',error);
            localStorage.clear();
            navigate("/")
        };
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
                 <li className="nav-item">
                <NavLink  className="nav-link" onClick={handleLogout}>
                    Logout
                </NavLink>
                </li>
            </ul>
        </div>
    </nav>;
}

export default Navbar;