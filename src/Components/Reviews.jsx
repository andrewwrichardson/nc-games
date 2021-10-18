import "../styles/Reviews.css";
import { Link } from "react-router-dom";
import { getCategories, getReviews } from "../utils";
import { useEffect, useState, useParams } from "react";
import ReviewByCategory from "./ReviewByCategory";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const category_slug = useParams();
  //console.log(category_slug, "@@@@@@@@@@@@@@");
  useEffect(() => {
    getReviews()
      .then((reviewFromApi) => {
        //console.log(data);
        setReviews(reviewFromApi);
        console.log(reviewFromApi, "Aaaaaaa");
        setIsLoading(false);
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  }, []);

  useEffect(() => {
    getCategories()
      .then((categoriesFromApi) => {
        //console.log(data);
        setCategories(categoriesFromApi);
        console.log(categoriesFromApi, "categories");
      })
      .catch((err) => {
        console.dir(err, "error message");
      });
  }, []);

  return (
    <>
      <section className="categorySelect">
        {categories.map((obj) => {
          return <Link to="/:id">{obj.slug}</Link>;
        })}
      </section>

      <section className="reviews_frame">
        {reviews.map((obj) => {
          return (
            <section className="review_frame">
              <p className="title">{obj.title}</p>
              <img src={obj.review_img_url} alt="" className="review_img"></img>
              <p className="designer"> {obj.designer}</p>
              <p className="owner">{obj.owner}</p>
              <p className="votes">Votes {obj.votes}</p>
              <p className="review_body">{obj.review_body}</p>
              <p className="category">Category {obj.category}</p>
            </section>
          );
        })}
      </section>
    </>
  );
};

export default Reviews;
