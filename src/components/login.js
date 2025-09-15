
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errormessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e) => {
    e.preventDefault();
     try {
    const response = await axios.post('http://127.0.0.1:8000/login/', {
      email: email,
      password: password
    });

    // Make sure the backend returns { token: "..." }
    const token = response.data.user.token;
    if (token) {
      localStorage.setItem('token', token);
      alert("Login successful!");
      navigate('/doctorlistingpage')
      // Redirect to another page or reload
    } else {
      alert("Token not received.");
    }
  } catch (err) {
    alert("Login failed: " + err.response?.data?.detail || err.message);
    setErrorMessage(err.message)
  }
};
    return(
        <div className="container-fluid bg-doctordetail">
            <div className=" d-flex justify-content-center align-items-center vh-100 ">
                {errormessage && (
                    <div style={{ color: "red", marginBottom: "1rem" }}>{errormessage}</div>
                    )}
                <div className="card p-4 blur-card" style={{width:"500px"}}>
                    <div className="card-body text-center">
                        <h2 className="card-title" style={{color:"#3c7088"}}>Login</h2>
                        <div className="form-group mt-3">
                            <input type="email" className="form-control blur-card" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="form-control blur-card" value={password} onChange={(e)=>setPassword(e.target.value)}/>

                        </div>
                        <button className="btn btn-block btn-primary mb-4" onClick={handleLogin}>LOGIN</button>
                        <Link to="/signup">Not Registered? Click here</Link>
                    </div>
                </div>
            </div>

        </div>
    )

}
export default Login;