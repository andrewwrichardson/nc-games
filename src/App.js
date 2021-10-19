import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Reviews from "./Components/Reviews";
import Nav from "./Components/Nav";
import Login from "./Components/Login";
import CommentsByReview from "./Components/CommentsByReview";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route exact path="/">
            <Reviews />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route exact path="/Reviews/:category">
            <Reviews />
          </Route>
          <Route exact path="/Reviews/:Review_id/Comments">
            <CommentsByReview />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
