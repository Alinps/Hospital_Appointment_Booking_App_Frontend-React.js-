import Navbar from "./Navbar";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import React,{useState} from "react";
import checkAuth from "./auth/checkAuth";
import {useSelector} from "react-redux";
import "../static/css/DoctorBooking.css"

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
   return (
    <div>
        
    
    <div className="booking-page">
      <Navbar />

 <div className="booking-content">
      <section className="booking-card glass">
        {/* HEADER */}
        <div className="booking-header">
          <h2>Confirm Appointment</h2>
          <p>Please review the details and select a suitable time slot.</p>
        </div>

        {/* DOCTOR INFO */}
        <div className="doctor-summary glass">
          <div>
            <h3>Dr. Bruce Wayne</h3>
            <span>Cardiology Specialist</span>
          </div>
          <div className="doctor-note">
            <p>✔ Experienced Consultant</p>
            <p>✔ Hospital Verified</p>
          </div>
        </div>

        {/* FORM */}
        <div className="booking-form">
          {error && <p className="error-text">{error}</p>}

          <div className="form-row">
            <div className="form-group">
              <label>Appointment Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Preferred Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="booking-info">
            <p>
              ⏱ Please arrive at least <b>10 minutes early</b> for registration.
            </p>
            <p>
              📄 Carry previous reports if this is a follow-up consultation.
            </p>
          </div>

          <button className="btn-primary booking-btn" onClick={handleBook}>
            Confirm Appointment
          </button>
        </div>
      </section>
      </div>
    </div>
    </div>
  );
}
export default checkAuth(Doctorbooking);