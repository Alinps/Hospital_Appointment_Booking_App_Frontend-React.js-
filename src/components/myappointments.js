import Navbar from "./Navbar";
import axios from"axios"
import React,{useState,useEffect} from "react";
import '../App.css'
import checkAuth from "./auth/checkAuth";
import {useSelector} from "react-redux";
function Myappointment(){
    const[data,setData] = useState([]);
    const[error,setError] = useState();
    const[view,setView]=useState("upcoming"); //"upcoming" | "past"
    let user = useSelector(store => store.auth.user)

        const isPastAppointment = (dateStr)=>{
        const today = new Date();
        today.setHours(0,0,0,0);
        const appointmentDate = new Date(dateStr);
        return appointmentDate < today; 
    }

    const formatTime = (timeStr) =>
        new Date(`1970-01-01T${timeStr}`).toLocaleTimeString('en-us',{
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    
    const formatDate = (dateStr) =>{
        new Date(dateStr).toLocaleDateString('en-us',{
            year:'numeric',
            month:'long',
            day:'numeric'
        })};

    const filteredAppointments = data.filter(item => {
        return view ==="past" 
        ? isPastAppointment(item.date)
        : !isPastAppointment(item.date);
    });


    useEffect(()=>{
        
        if(!user){
            console.warn("No token found in localStorage.");
            setError("User not authenticated. Please log in.");
            return;
        }
        axios.get("http://127.0.0.1:8000/myappointments/",{headers:{Authorization:`Token ${user.token}`}})
        .then((response)=>{
            setData(response.data);
        })
        .catch((err)=>{
            setError(err.response?.data?.detail || "An error occurred")
        });
    },[user]);

    const handleCancelAppointment = (id)=>{
        axios.delete(`http://127.0.0.1:8000/cancelappointment/${id}/`,{headers:{Authorization:`Token ${user.token}`}})
        .then(()=>{
            alert('Appoinment cancelled');
            setData(prev => prev.filter(item =>item.id !== id));
        })
        .catch(err =>{
            alert('Cancel failed');
            console.error(err);
        });
    }
    return(
        <div>
            <Navbar/>
            <div className="container-fluid bg-doctordetail">
                <h2 className="custom-font-text" style={{fontSize:"50px",color:"#3c7088"}}>My Appointments</h2>
               <div className="mb-3">
  <button
    className={`btn btn-sm mr-2 ${view === "upcoming" ? "btn-info" : "btn-outline-info"}`}
    onClick={() => setView("upcoming")}
  >
    Upcoming Appointments
  </button>

  <button
    className={`btn btn-sm ${view === "past" ? "btn-secondary" : "btn-outline-secondary"}`}
    onClick={() => setView("past")}
  >
    Past Appointments
  </button>
</div>

                {filteredAppointments.map((item)=>(
                <div key={item.id} className="card mt-4 blur-card">
                     {error && <p style={{color: "red"}}>Error: {error}</p>}
                    <div className="card-body">
                        <h3 className="ccard-title">Upcomming</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card mb-2 blur-card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-2">
                                                    <p className="custom-font-text"><b>{item.doctor_name}</b></p>
                                                </div>
                                                <div className="col-md-2">
                                                    <p>{item.department}</p>
                                                </div>
                                                    <div className="col-md-2">
                                                <p>{formatDate(item.date)}</p>
                                                </div>
                                                <div className="col-md-2">
                                                    <p>{formatTime(item.time)}</p>
                                                </div>
                                                <div className="col-md-4">
                                                    <button 
                                                    className="btn btn-sm btn-danger float-right" 
                                                    onClick={()=>{handleCancelAppointment(item.id)}}
                                                    disabled={isPastAppointment(item.date)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                </div>
                ))}
    
          </div>
          </div>
          
    )
}
export default checkAuth(Myappointment);