import React, { useState } from "react";
import "../../css/user_experince/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      const { access_token, user_id, user_type } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("userId", user_id);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `You have successfully logged in with ID: ${user_id}`,
        showConfirmButton: false,
        timer: 1500,
      });

      if (user_type === "isOfficer") {
        localStorage.setItem("isOfficer", true); // Simpan informasi isOfficer di localStorage
        navigate("/dashboard"); // Arahkan ke dashboard jika isOfficer true
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn">
          Log In
        </button>
        <p className="toggle-form">
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
