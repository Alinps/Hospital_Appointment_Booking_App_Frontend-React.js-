import checkGuest from "./auth/checkGuest";
import { Link } from "react-router-dom";
function Landingpage(){
    
    return(
        <div>
           
                <nav class="navbar glass">
                    <div class="logo">CarePlus Hospital</div>
                    <div class="nav-actions">
                        <Link to="/login" class="btn-outline"> Login </Link>
                        <Link to="/signup"class="btn-primary"> Re </Link>
    
                    </div>
                </nav>

                <section class="hero glass">
                    <h1>Quality Healthcare, Without the Wait</h1>
                    <p>
                        CarePlus Hospital brings experienced doctors, modern facilities,
                        and simple appointment booking together — so you can focus on getting better.
                    </p>

                    <div class="hero-actions">
                        <button class="btn-primary">Book Appointment</button>
                        <button class="btn-outline">View Doctors</button>
                    </div>
                </section>

                <section class="about">
                    <div class="glass about-card">
                        <h2>About CarePlus</h2>
                        <p>
                        CarePlus Hospital has been serving patients with a focus on accurate
                        diagnosis, ethical treatment, and personal care. Our departments work
                        together to ensure every patient receives the right care at the right time.
                        </p>
                        <p>
                        From general consultations to specialist care, we prioritize clarity,
                        transparency, and patient comfort.
                        </p>
                    </div>
                </section>

                <section class="doctors">
                    <h2>Our Doctors</h2>

                    <div class="doctor-grid">
                        <div class="glass doctor-card">
                        <h4>Dr. Ananya Rao</h4>
                        <p>Cardiology</p>
                        <span>12+ years experience</span>
                        </div>

                        <div class="glass doctor-card">
                        <h4>Dr. Vikram Menon</h4>
                        <p>Orthopedics</p>
                        <span>Joint & trauma specialist</span>
                        </div>

                        <div class="glass doctor-card">
                        <h4>Dr. Sneha Kulkarni</h4>
                        <p>General Medicine</p>
                        <span>Primary & preventive care</span>
                        </div>
                    </div>
                </section>





            </div>
   
    )
}
export default checkGuest(Landingpage);