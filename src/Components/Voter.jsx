import { useState } from "react";
import { patchReview } from "../utils";
import "../styles/Reviews.css";

const Voter = ({ review_id, votes }) => {
  const [voteChange, setVotesCount] = useState(0);
  const onClickHandle = () => {
    setVotesCount((currCount) => currCount + 1);
    patchReview(review_id, 1)
      .then((data) => {})
      .catch((err) => {
        //console.dir(err, "error message");
        setVotesCount((currCount) => currCount - 1);
      });
  };
  return (
    <div className="commentVotes">
      <button onClick={onClickHandle}>{votes + voteChange}👍</button>
    </div>
  );
};
export default Voter;
