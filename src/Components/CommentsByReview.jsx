import React from "react";
import { useParams } from "react-router-dom";
import { getReview, getCommentsByReview } from "../utils";
import { useEffect, useState } from "react";
import Voter from "./Voter";
import "../styles/CommentsByReview.css";
import "../App.css";
import AddComment from "./AddComment";

const CommentsByReview = ({ user }) => {
  const { Review_id } = useParams();
  const [commentsByReview, setCommentsByReview] = useState([]);
  const [Review, setReview] = useState([]);
  const [popup, setPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [noEntries, setNoEntries] = useState(true);
  console.log(Review_id, "@@@@@");
  useEffect(() => {
    getReview(Review_id)
      .then((reviewFromApi) => {
        setReview(reviewFromApi);
        setIsLoading(false);
        console.log(Review_id);
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  }, [Review_id]);

  useEffect(() => {
    getCommentsByReview(Review_id)
      .then((commentsFromApi) => {
        setCommentsByReview(commentsFromApi);
        if (commentsFromApi.length > 0) {
          setNoEntries(false);
        }
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  }, [Review_id]);

  return (
    <div>
      <>
        {isLoading ? (
          <h1>loading</h1>
        ) : (
          <>
            <section className="comment_review_frame">
              <p className="title">{Review[0].title}</p>
              <img
                src={Review[0].review_img_url}
                alt=""
                className="review_img"
              ></img>
              <p className="designer"> {Review[0].designer}</p>
              <p className="owner">{Review[0].owner}</p>
              <Voter review_id={Review[0].review_id} votes={Review[0].votes} />
              <p className="review_body">{Review[0].review_body}</p>
              <p className="category">Category {Review[0].category}</p>
            </section>
            <h2>Comments</h2>

            <button
              className="genButton"
              onClick={() => setPopup(() => setPopup((b) => !b))}
            >
              Add Comment
            </button>
            <AddComment
              popup={popup}
              setPopup={setPopup}
              user={user}
              review_id={Review_id}
            ></AddComment>

            {commentsByReview.map((obj) => {
              return (
                <section className="commentFrame" key={obj.comment_id}>
                  <p className="commentAuthor">{obj.author}</p>
                  <p className="commentBody"> {obj.body}</p>
                  <p className="commentVotes"> Votes {obj.votes}</p>
                  <p className="commentCreatedAt">{obj.created_at}</p>
                </section>
              );
            })}
          </>
        )}

        {noEntries && <h3>This review has no comments yet!</h3>}
      </>
    </div>
  );
};

export default CommentsByReview;
