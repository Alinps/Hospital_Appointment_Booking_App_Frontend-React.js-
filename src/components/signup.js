import {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import checkGuest from "./auth/checkGuest";
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

    return(
        <div>
            <div className = "container-fluid bg-doctordetail">
                <div className="d-flex justify-content-center align-items-center vh-100">
                  {errormessage && (
                    <div style={{ color: "red", marginBottom: "1rem" }}>{errormessage}</div>
                    )}
                    <div className = "card p-2 blur-card" style={{width:"500px"}}>
                        <div className="card-body">
                            <h2 style={{color:"#3c7088"}} mb-2>Register</h2>
                            <div className="form-group mb-3">
                                <input className="form-control blur-card" value={name} type="text" placeholder="Name" name="name" onChange={(e)=>setName(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <input className="form-control blur-card" type="email" placeholder="Email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>

                            <div className="=form-group">
                                <label className="form-label">Date of Birth</label>
                                <input type="date" className="form-control blur-card" name="dob" value={dob} onChange={(e)=>setDob(e.target.value)}/>
                            </div>

                            <div className="form-group mt-3">
                                <label className="form-label">Gender:</label>
                                <select className="form-select blur-card" name="gender" value={gender} onChange={(e)=>setGender(e.target.value)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <input className="form-control blur-card" type="text-area" placeholder="address" name="address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone number</label>
                                <input className="form-control blur-card" type="tel" placeholder="9874521445" name="contact_no" value={contact_no} onChange={(e)=>setContact(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input className="form-control blur-card" type="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            </div>

                            <div className="form-group">
                                <label className="form-label"> Confirm Password</label>
                                <input className="form-control blur-card" type="password" value={confirmpassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
                            </div>
                            <button className="btn btn-primary float-right" onClick={registerUser}>Register</button>

                        </div></div>
                </div>
            </div>
        </div>
    )
}
export default checkGuest(Signup);
