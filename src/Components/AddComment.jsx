//import react from "react";
import "../styles/AddComment.css";
import "../App.css";
import { useState } from "react";
import { postComment } from "../utils";

const AddComment = ({ setPopup, popup, user, review_id }) => {
  const [body, setBody] = useState("");

  const handleSubmitComment = (e) => {
    console.log("insubmit");
    e.preventDefault();
    postComment(review_id, user, body)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  };

  return (
    <div>
      {popup && (
        <section className="popupBackground">
          <form className="popup" onSubmit={handleSubmitComment}>
            <h1>Post Comment</h1> <br />
            <span>Author: {user}</span> <br />
            <textarea
              className="login_text"
              onChange={(e) => setBody(e.target.value)}
              defaultValue="Add comment here"
            ></textarea>
            <br />
            <button onClick={setPopup((b) => !b)} className="genButton">
              submit
            </button>
            <br />
            <button onClick={() => setPopup((b) => !b)} className="genButton">
              close
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default AddComment;
