import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Navbar as BootstrapNavbar, Nav, Container, Button } from "react-bootstrap";
import profil from "../../images/user_experience/profile.png";
import "../../css/user_experince/Navbar.css";

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
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          text: "You have successfully logged out!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const token = localStorage.getItem("token");
  const isOfficer = localStorage.getItem("isOfficer") === "true"; // Convert ke boolean

  const handleProfileClick = () => {
    if (token && isOfficer) {
      navigate("/dashboard");
    } else if (token) {
      navigate("/profile");
    } else {
      navigate("/user");
    }
    closeMenu();
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Link to="/" className="navbar-brand">
          Belanjaku
        </Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={handleClick} />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className={click ? "show" : ""}>
          <Nav className="ms-auto me-auto">
            <Nav.Link as={Link} to="/" onClick={closeMenu} className={isActive("/")}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={closeMenu} className={isActive("/about")}>
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/produk" onClick={closeMenu} className={isActive("/produk")}>
              Produk
            </Nav.Link>
            {!isOfficer && (
              <Nav.Link as={Link} to="/order" onClick={closeMenu} className={isActive("/order")}>
                Order
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            <Nav.Item>
              <div className="nav-link user-icon" onClick={handleProfileClick}>
                <img src={profil} alt="user" className="user-icon-img" />
              </div>
            </Nav.Item>
            {token && (
              <Nav.Item>
                <Button variant="outline-light" className="logout-btn" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
