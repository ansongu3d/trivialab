import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container-fluid" id="title">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link to="/">
          <img id="logo" src="/images/logo.svg" alt="Trivia Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto text-right" id="navbarElement">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/trivia">
                Trivia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rank">
                Rank
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
