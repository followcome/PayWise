import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>SaaS Academy</h2>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        {/* <Link to="/payme?nt-success/123" className="nav-link">Test Success</Link> */}
        <Link to="/login" className="nav-link">Login</Link>
      </div>
    </nav>
  );
}
