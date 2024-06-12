import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./Navbar.css";
import profil from "./images/profile.png";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => setClick(!click);
  const closeMenu = () => setClick(false);

  const isActive = (path) => (location.pathname === path ? "active" : "");

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "http://localhost:5000/api/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem("token");
        // Tampilkan SweetAlert ketika logout berhasil
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "You have successfully logged out!",
          showConfirmButton: false,
          timer: 1500,
        });
        // Redirect ke halaman login setelah logout berhasil
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Periksa keberadaan token dalam local storage
  const token = localStorage.getItem("token");

  // Fungsi untuk menangani klik pada tombol profil
  const handleProfileClick = () => {
    // Cek keberadaan token dalam local storage
    if (token) {
      // Jika token tersedia, arahkan ke halaman profil
      navigate("/profile");
    } else {
      // Jika token tidak tersedia, arahkan ke halaman login
      navigate("/user");
    }
    // Tutup menu setelah mengklik tombol profil
    closeMenu();
  };

  return (
    <div className="header">
      <nav className="navbar">
        <Link to="/" className="title text-decoration-none text-white">
          <h1>Belanjaku</h1>
        </Link>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className={`nav-item ${isActive("/")}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={`nav-item ${isActive("/about")}`}>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className={`nav-item ${isActive("/produk")}`}>
            <Link to="/produk" onClick={closeMenu}>
              Produk
            </Link>
          </li>
          <li className={`nav-item nav-item-order ${isActive("/order")}`}>
            <Link to="/order" onClick={closeMenu}>
              Order
            </Link>
          </li>
          <li className={`nav-item ${isActive("/user")}`}>
            {/* Ganti Link menjadi onClick dan tambahkan handleProfileClick */}
            <div className="user-icon" onClick={handleProfileClick}>
              <img src={profil} alt="user" className="user-icon" />
            </div>
          </li>
          {/* Tampilkan tombol logout jika token ada dalam local storage */}
          {token && (
            <li className="nav-item">
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
