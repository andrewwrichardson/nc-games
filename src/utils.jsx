import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://northcoder-games.herokuapp.com/api",
});

export const getReviews = async () => {
  const { data } = await gamesApi.get("/reviews");
  //console.log(data, "<<<<");
  return data.reviews;
};

export const getCategories = async () => {
  const { data } = await gamesApi.get(`/categories`);
  //console.log(data, "<<<<");
  return data.categories;
};
// , {
//     params: { category: category },
//   }
