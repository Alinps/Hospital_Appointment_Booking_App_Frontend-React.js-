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
    <div className="container-fluid bg-doctordetail">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4 blur-card" style={{ width: "500px" }}>
          <div className="card-body text-center">
            <h2 className="card-title" style={{ color: "#3c7088" }}>
              Login
            </h2>

            {errorMessage && (
              <p style={{ color: "red", marginBottom: "1rem" }}>
                {errorMessage}
              </p>
            )}

            <div className="form-group mt-3">
              <input
                type="email"
                className="form-control blur-card"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control blur-card"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-block btn-primary mb-4"
              onClick={handleLogin}
            >
              LOGIN
            </button>

            <Link to="/signup">Not registered? Click here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkGuest(Login);
