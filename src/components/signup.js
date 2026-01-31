import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkGuest from "./auth/checkGuest";
import  "../static/css/signup.css";
function Signup(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [contact_no, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [errormessage, setErrorMessage] = useState("");
  const navigate=useNavigate();

  const registerUser = ()=> {
    if (password !== confirmpassword){
      setErrorMessage("Password doesnt match!")
      return
    };

    const user = {
      name,
      email,
      dob,
      gender,
      address,
      contact_no,
      password
    };

    axios.post("http://127.0.0.1:8000/signup",user)
    .then((response)=>{
      setErrorMessage("");
      alert("User successfully Registered!")
      navigate("/")
    })
    .catch((error)=>{
      if (error.response?.data?.message) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Failed to connect to API.");
        }
    });
  };

     return (
    <div className="signup-page">
      <div className="signup-card glass">
        <div className="signup-header">
          <h2>Create Your Account</h2>
          <p>Book appointments, manage visits, and access care seamlessly.</p>
        </div>

        <form className="signup-form">
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" onChange={(e)=>setName(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="9876543210" onChange={(e)=>setContact(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input type="date"  onChange={(e)=>setDob(e.target.value)} />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select  onChange={(e)=>setGender(e.target.value)}>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••"  onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••"  onChange={(e)=>setconfirmPassword(e.target.value)}/>
            </div>

            <div className="form-group full">
              <label>Address (Optional)</label>
              <textarea rows="2" placeholder="Street, City, State"  onChange={(e)=>setAddress(e.target.value)}></textarea>
            </div>
          </div>

          <button className="btn-primary signup-btn" onClick={registerUser}>
            Create Account
          </button>

          <p className="signup-footer">
            Already have an account? <span>Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
export default checkGuest(Signup);
