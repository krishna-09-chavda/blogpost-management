import { FaBlog, FaHome, FaMoon, FaPlusSquare, FaSignOutAlt, FaStar, FaSun } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const navigate=useNavigate();
  const{theme ,toggleTheme } = useTheme();
  const user = JSON.parse(localStorage.getItem("authData"));

  const handleLogout = ()=>{
    localStorage.removeItem("authData");
    localStorage.removeItem("loginData");
    navigate("/login");
  }
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaBlog className="logo-icon" />
          <span className="logo-text">BlogPost</span>
        </div>

        <div className="navbar-links">
          <NavLink to="/dashboard" className="nav-item">
            <FaHome className="nav-icon" />
            Home
          </NavLink>

          <NavLink to="/createpost" className="nav-item">
            <FaPlusSquare className="nav-icon" />
            Create Post
          </NavLink>
          
           <NavLink to="/analytics" className="nav-item">
            <FaPlusSquare className="nav-icon" />
            Analytics
          </NavLink>
         
            <NavLink to="/favorites" className="nav-item">
            <FaStar className="nav-icon"/>
            Favorite
          </NavLink>
        </div>

        <div className="navbar-actions">
          <span className="user-name">{user.name}</span>
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
            {
              theme==='light' ?<FaMoon/>:<FaSun/>
            }
          </button>

          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
