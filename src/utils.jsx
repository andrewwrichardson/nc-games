import axios from "axios";

const gamesApi = axios.create({
  baseURL: "https://northcoder-games.herokuapp.com/api",
});

export const getReviews = async (category, sort_by, order) => {
  const { data } = await gamesApi.get("/reviews", {
    params: { category: category, sort_by: sort_by, order: order },
  });
  console.log(data, "<<<<");
  return data.reviews;
};

export const getCategories = async () => {
  const { data } = await gamesApi.get(`/categories`);
  //console.log(data, "<<<<");
  return data.categories;
};

export const getCommentsByReview = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}/comments`);
  //console.log(data, "<<<<");
  return data.commentsByReview_id;
};

export const getReview = async (review_id) => {
  const { data } = await gamesApi.get(`/reviews/${review_id}`);
  console.log(data, "<<<<");
  return data.review;
};

export const patchReview = async (review_id, votes) => {
  const { data } = await gamesApi.patch(`/reviews/${review_id}`, {
    inc_votes: votes,
  });
  //console.log(data, "<<<<");
  //console.log(review_id, votes, "inputs");
  return data;
};

export const postComment = async (review_id, username, body) => {
  console.log(username, review_id, body);
  const { data } = await gamesApi.post(`/reviews/${review_id}/comments`, {
    username: username,
    body: body,
    review_id: review_id,
  });
  console.log(data, "<<<<");
  //console.log(review_id, votes, "inputs");
  return data;
};

export const getUsers = async (review_id, username, body) => {
  console.log(username, review_id, body);
  const { data } = await gamesApi.post(`/reviews/${review_id}/comments`, {
    username: username,
    body: body,
    review_id: review_id,
  });
  console.log(data, "<<<<");
  //console.log(review_id, votes, "inputs");
  return data;
};
