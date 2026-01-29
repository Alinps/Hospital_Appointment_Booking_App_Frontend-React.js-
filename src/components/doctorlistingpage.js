import Navbar from "./navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import React,{useState,useEffect} from "react"
import '../App.css'
function DoctorListingPage(){
    const token = localStorage.getItem('token');
    const [data,setData] = useState([]);
    const [error,setError] = useState(null);
    const [department,setDepartment]=useState("");
    const [departments,setDepartments]=useState([]);
    const navigate=useNavigate();
   useEffect(() => {
  if (!token) {
    console.warn("No token found in localStorage.");
    setError("User not authenticated. Please log in.");
    return;
  }

  axios.get('http://127.0.0.1:8000/doctorlist/', {
    headers: {
      Authorization: `Token ${token}`
    },
    params:{
        department:department || undefined
    }
  })
  .then((response) => {
    setData(response.data);
    const uniqueDepartments=[
        ...new Set(response.data.map(item=>item.department))
    ];
    setDepartments(uniqueDepartments);
  })
  .catch((err) => {
    setError(err.response?.data?.detail || "An error occurred");
  });
}, [token,department]);


    return(
        <div>
            <Navbar/>
            <div className="container-fluid bg-home" style={{color:"lightblue"}}>
                <h1 className=" custom-font-heading">Our Doctor's</h1>
                   <div className="dropdown">
  <button
    type="button"
    className="btn btn-info dropdown-toggle"
    data-toggle="dropdown"
  >
    {department || "Filter by Department"}
  </button>

  <div className="dropdown-menu">
    <button
      className="dropdown-item"
      onClick={() => setDepartment("")}
    >
      All Departments
    </button>

    {departments.map((dept, index) => (
      <button
        key={index}
        className="dropdown-item"
        onClick={() => setDepartment(dept)}
      >
        {dept}
      </button>
    ))}
  </div>
</div>
      

                    <div className="row no-gutters mt-2">
                        {error && <p style={{color: "red"}}>Error: {error}</p>}

                        {data.map((item) => (
   
                        <div key={item.id} className="card customCard blur-card mt-3 mr-2">
                            <div className="row no-gutters align-items-center">
                                <div className="col-md-4 p-2">
                                     <img
                                      src={`http://127.0.0.1:8000/${item.image}`}

                                        className="img-fluid rounded"
                                        alt="doctorimage"
                                        />
                                </div>
                                <div className="col-md-7">
                                    <div className="card-body">
                                        <h5 className="card-title" style={{ color: "#3c7088" }}>
                                        {item.name}
                                        </h5>
                                        <p className="card-text p-0 m-0" style={{ color: "#3c7088" }}>
                                        Department: {item.department}
                                        </p>
                                        <p className="card-text p-0 m-0" style={{ color: "#3c7088" }}>
                                        Experience{item.experience}
                                        </p>
                                        <button 
                                            className="btn btn-info btn-sm" 
                                            onClick={() => navigate(`/doctorbooking/${item.id}`)}
                                        >Book
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                        ))}
                
            </div>
        </div>
        </div>
    )}
export default DoctorListingPage;