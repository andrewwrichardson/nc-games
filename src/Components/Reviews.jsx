import "../styles/Reviews.css";
import { Link } from "react-router-dom";
import { getCategories, getReviews } from "../utils";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Voter from "./Voter";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noEntries, setNoEntries] = useState(false);

  const { category } = useParams();

  useEffect(() => {
    getReviews(category)
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
  }, [category]);

  useEffect(() => {
    getCategories()
      .then((categoriesFromApi) => {
        setCategories(categoriesFromApi);
        //console.log(categoriesFromApi, "categories");
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
        <>
          <section className="categorySelect">
            {categories.map((obj) => {
              return <Link to={`/Reviews/${obj.slug}`}>{obj.slug}</Link>;
            })}
          </section>

          <section className="reviews_frame">
            {reviews.map((obj) => {
              return (
                <Link
                  to={`/Reviews/${obj.review_id}/Comments`}
                  key={obj.review_id}
                >
                  {obj.slug}
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
        </>
      )}
    </div>
  );
};

export default Reviews;
