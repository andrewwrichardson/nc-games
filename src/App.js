import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Reviews from "./Components/Reviews";
import Nav from "./Components/Nav";
import CommentsByReview from "./Components/CommentsByReview";
import { useState, useEffect } from "react";
import Graph from "./Components/Graph";

function App() {
  const [user, setUser] = useState("");

  const logIn = (username) => {
    setUser(username);
    console.log(username, "logged in ");
    localStorage.setItem("loggedInUser", username);
  };

  const logOut = () => {
    setUser(null);
    console.log(user, "logged out");
    localStorage.removeItem("loggedInUser");
  };

  useEffect(() => {
    const prevLoggedInUser = localStorage.getItem("loggedInUser");
    if (prevLoggedInUser) {
      setUser(prevLoggedInUser);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav logOut={logOut} user={user} logIn={logIn} />
        <Switch>
          <Route exact path="/">
            <Reviews />
          </Route>
          <Route exact path="/Graph">
            <Graph />
          </Route>
          <Route exact path="/Reviews/:Review_id?/Comments">
            <CommentsByReview user={user} />
          </Route>
          <Route exact path="/Reviews/:category?/:sort_by?/:order?">
            <Reviews />
          </Route>
          <Route>
            <p>404 Page not found</p>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
