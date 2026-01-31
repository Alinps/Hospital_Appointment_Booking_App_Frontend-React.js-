import Navbar from "./Navbar";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import React,{useState} from "react";
import checkAuth from "./auth/checkAuth";
import {useSelector} from "react-redux";

function Doctorbooking(){
    const {id} = useParams();
    const token = localStorage.getItem('token')
    const[date,setDate]=useState();
    const[time,setTime]=useState();
    const[error,setError]=useState();
    const navigate = useNavigate();
    let user = useSelector(store => store.auth.user)

    const handleBook = (e)=>{
        e.preventDefault();
        const bookingData={
            doctor:id,
            date:date,
            time:time
        };
        axios.post("http://127.0.0.1:8000/appointmentbooking/",bookingData,{headers:{Authorization:`Token ${user.token}`}})
        .then((response)=>{
            setError("")
            alert("Succssfully Booked!")
            navigate("/doctorlistingpage")
        })
        .catch((error)=>{
            if (error.response?.data?.message){
                setError(error.response.data.message);
            }
            else{
                setError("Failed to connect to API.");
            }
        });
    };
    return(
        <div>
            <Navbar/>
            <div className="container-fluid bg-doctordetail">
                <div className="d-flex justify-content-center align-items-center vh-100">
                     {error && <p style={{color: "red"}}>Error: {error}</p>}
                   <div className="card w-50 blur-card ">
                    <div className="card-body">
                        <h3 className=" card-title custom-font-heading" style={{color:"#3c7088"}}>Dr. Bruce Wayn</h3>
                        <h3 className="card-text custom-font-text" style={{fontWeight:500,color:"#3c7088"}}>Cardiology</h3>
                        <div className="form-group">
                            <label className="form-label">Select Appointment Date:</label>
                            <input type="date" className="form-control" value={date}onChange={(e)=>{setDate(e.target.value)}}/>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Select Time Slot:</label>
                            <input type="time" className="form-control" value={time} onChange={(e)=>setTime(e.target.value)}/>
                        </div>
                        <button className="btn btn-block btn-info" onClick={handleBook}>Confirm Appointment</button>

                    </div>
                   </div>

                </div>
            </div>
        </div>
    )
}
export default checkAuth(Doctorbooking);