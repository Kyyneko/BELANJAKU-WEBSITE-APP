import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Navbar from "./components/page/user_experience/Navbar";
import Home from "./components/page/user_experience/home";
import About from "./components/page/user_experience/About2";
import Produk from "./components/page/user_experience/Produk";
import User from "./components/page/user_experience/User";
import Order from "./components/page/user_experience/Order";
import Login from "./components/page/user_experience/Login";
import Register from "./components/page/user_experience/Register";
import Profile from "./components/page/user_experience/Profile";
import "./App.css"; // Import file CSS untuk animasi

const App = () => {
  const location = useLocation();

  return (
    <div className="app-container">
      <Navbar />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/order" element={<Order />} />
            <Route path="/produk" element={<Produk />} />
            <Route path="/user" element={<User />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

export default AppWithRouter;
