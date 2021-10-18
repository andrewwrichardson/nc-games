import "../styles/Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <img
          className="homeButton"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYo5yDGmVsaJeD_GKMIBOXkFW9pjF0VCkgQ&usqp=CAU"
          alt=""
        />
      </Link>

      <Link to="/Search"> Search</Link>
      <Link to="/Login">
        <img
          className="profileIcon"
          src="https://pic.onlinewebfonts.com/svg/img_237553.png"
          alt="welcome image"
        />
      </Link>
    </nav>
  );
};

export default Nav;
