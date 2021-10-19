//import react from "react";
import "../styles/AddComment.css";
const AddComment = ({ setPopup, popup }) => {
  return (
    <div className="popup">
      {popup ? (
        <form className="popupForm">
          <h1>form</h1> <button onclick={() => setPopup(false)}> submit</button>
          <button onclick={() => setPopup(false)}> close</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddComment;
