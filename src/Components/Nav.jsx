import "../styles/Nav.css";
import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = ({ logOut, user, logIn }) => {
  const [userValue, setUserValue] = useState("");

  const logInSubmit = (e) => {
    e.preventDefault();
    logIn(userValue);
  };

  return (
    <nav>
      <Link to="/">
        <img
          className="Nav_homeButton"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOYo5yDGmVsaJeD_GKMIBOXkFW9pjF0VCkgQ&usqp=CAU"
          alt=""
        />
      </Link>
      <Link to="/Graph">Graph</Link>
      {user && <span>Welcome {user}</span>}
      <form onSubmit={logInSubmit} className="">
        <input
          type="text"
          className="Nav_loginf"
          onChange={(e) => setUserValue(e.target.value)}
        ></input>
        <button input="submit" className="genButton">
          Login
        </button>
        <button className="genButton" onClick={logOut}>
          Log Out
        </button>
      </form>
    </nav>
  );
};

export default Nav;
