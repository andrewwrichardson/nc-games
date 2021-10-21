import "../styles/Reviews.css";
import "../App.css";
import { Link } from "react-router-dom";
import { getCategories, getReviews } from "../utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noEntries, setNoEntries] = useState(false);

  let { category, sort_by, order } = useParams();

  const validColumns = [
    "owner",
    "title",
    "review_id",
    "category",
    "review_img_url",
    "created_at",
    "votes",
    "comment_count",
  ];

  useEffect(() => {
    getReviews(category, sort_by, order)
      .then((reviewFromApi) => {
        setReviews(reviewFromApi);
        setIsLoading(false);
        if (reviewFromApi.length === 0) {
          setNoEntries(true);
        }
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  }, [category, sort_by, order]);

  useEffect(() => {
    getCategories()
      .then((categoriesFromApi) => {
        setCategories(categoriesFromApi);
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  }, []);

  return (
    <div>
      {noEntries ? (
        <h1>No Entries for category</h1>
      ) : isLoading ? (
        <h1>loading</h1>
      ) : (
        <section className="reviews_frame">
          <section className="dropdown">
            <button className="genButton">Review Category</button>
            <div className="dropdown-content">
              {categories.map((obj) => {
                return (
                  <Link to={`/Reviews/${obj.slug}`} key={obj.slug}>
                    <p className="dropDownText">{obj.slug}</p>
                    <br />
                  </Link>
                );
              })}
            </div>
          </section>

          <section className="dropdown">
            <button className="genButton">Sort By</button>
            <div className="dropdown-content">
              {validColumns.map((obj) => {
                return (
                  <Link to={`/Reviews/${category}/${obj}`} key={obj}>
                    <p className="dropDownText">{obj}</p>
                    <br />
                  </Link>
                );
              })}
            </div>
          </section>

          <div className="dropdown">
            <button className="genButton">Sort Order</button>
            <div className="dropdown-content">
              <Link to={`/Reviews/${category}/${sort_by}/asc`} key="asc">
                <p className="dropDownText">asc</p> <br />
              </Link>

              <Link to={`/Reviews/${category}/${sort_by}/desc`} key="desc">
                desc <br />
              </Link>
            </div>
          </div>

          {reviews.map((obj) => {
            return (
              <Link
                to={`/Reviews/${obj.review_id}/Comments`}
                key={obj.review_id}
              >
                <section className="review_frame">
                  <p className="title">{obj.title}</p>
                  <img
                    src={obj.review_img_url}
                    alt=""
                    className="review_img"
                  ></img>
                  <p className="designer"> {obj.designer}</p>
                  <p className="owner">{obj.owner}</p>

                  <p className="review_body">{obj.review_body}</p>
                  <p className="category">Category {obj.category}</p>
                </section>
              </Link>
            );
          })}
        </section>
      )}
    </div>
  );
};

export default Reviews;
