import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../store/authSlice";
import checkGuest from "./auth/checkGuest";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000/login/", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", response.data);

      // ✅ Backend returns { user: { id, name, email, token } }
      const user = response.data.user;

      if (!user?.token) {
        throw new Error("Token missing in login response");
      }

      // ✅ Update Redux (localStorage handled in slice)
      dispatch(setUser(user));

      alert("Login successful!");

      // ❌ DO NOT navigate here
      // checkGuest will redirect automatically

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setErrorMessage(
        err.response?.data?.detail || err.message || "Login failed"
      );
    }
  };

 return (
  <div className="glass-login-page">
    <div className="glass-login-container">

      {/* LEFT — LOGIN */}
      <div className="glass-panel glass-login-form">
        <h2>Sign in</h2>
        <p className="subtitle">
          Access your appointments and medical records
        </p>

        {errorMessage && (
          <p className="login-error">{errorMessage}</p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log in</button>
        </form>

        <div className="login-links">
          <Link to="/signup">Create an account</Link>
        </div>
      </div>

      {/* RIGHT — INFO */}
      <div className="glass-panel glass-login-info">
        <h3>CarePlus Hospital</h3>
        <p>
          Secure access for patients to manage appointments,
          consult doctors, and view treatment history.
        </p>

        <ul>
          <li>✔ Trusted specialists</li>
          <li>✔ Secure medical data</li>
          <li>✔ Easy appointment booking</li>
        </ul>
      </div>

    </div>
  </div>
);

}

export default checkGuest(Login);
