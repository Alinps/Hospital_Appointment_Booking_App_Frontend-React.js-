import checkGuest from "./auth/checkGuest";
import { Link } from "react-router-dom";
function Landingpage(){
    
    return (
  <div className="page-bg">
    <nav className="navbar glass">
      <div className="logo">CarePlus Hospital</div>
      <div className="nav-actions">
        <Link to="/login" className="btn-outline">Login</Link>
        <Link to="/signup" className="btn-primary">Register</Link>
      </div>
    </nav>

    <section className="hero glass">
      <h1>Quality Healthcare, Without the Wait</h1>
      <p>
        CarePlus Hospital brings experienced doctors, modern facilities,
        and simple appointment booking together — so you can focus on getting better.
      </p>

      <div className="hero-actions">
        <button className="btn-primary">Book Appointment</button>
        <button className="btn-outline">View Doctors</button>
      </div>
    </section>

    <section className="about">
      <div className="glass about-card">
        <h2>About CarePlus</h2>
        <p>
          CarePlus Hospital has been serving patients with a focus on accurate
          diagnosis, ethical treatment, and personal care.
        </p>
        <p>
          From general consultations to specialist care, we prioritize clarity,
          transparency, and patient comfort.
        </p>
      </div>
    </section>

    <section className="doctors">
      <h2>Our Doctors</h2>

      <div className="doctor-grid">
        <div className="glass doctor-card">
          <h4>Dr. Ananya Rao</h4>
          <p>Cardiology</p>
          <span>12+ years experience</span>
        </div>

        <div className="glass doctor-card">
          <h4>Dr. Vikram Menon</h4>
          <p>Orthopedics</p>
          <span>Joint & trauma specialist</span>
        </div>

        <div className="glass doctor-card">
          <h4>Dr. Sneha Kulkarni</h4>
          <p>General Medicine</p>
          <span>Primary & preventive care</span>
        </div>
      </div>
    </section>
  </div>
);

}
export default checkGuest(Landingpage);