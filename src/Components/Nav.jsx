import "../styles/Nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = ({ logOut, user, logIn }) => {
  const [userValue, setUserValue] = useState();

  const logInSubmit = (e) => {
    e.preventDefault();
    logIn(userValue);
  };

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
      <span>Welcome {user}</span>{" "}
      <button className="Nav_logOutButton" onClick={logOut}>
        Log Out
      </button>
      <form onSubmit={logInSubmit}>
        <input
          type="text"
          className="login_text"
          onChange={(e) => setUserValue(e.target.value)}
        ></input>
        <button input="submit" className="login_button">
          Login
        </button>
      </form>
    </nav>
  );
};

export default Nav;
