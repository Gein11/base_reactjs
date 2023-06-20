import axios from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("roleCode", role);
  data.append("image", image);
  data.append("status", 1);
  //   let res = await axios.post("http://localhost:8081/api/user", data);
  return axios.post("api/user", data);
};

const getAllusers = () => {
  return axios.get("api/user");
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/user?page=${page}&limit=${limit}`);
};
const getQuizByUser = () => {
  return axios.get("/list-quiz");
};
const getDataQuiz = (id) => {
  return axios.get(`do-quiz?quizId=${id}`);
};
const getAllQuizForAdmin = () => {
  return axios.get(`list-quiz`);
};

const deleteQuizForAdmin = (data) => {
  return axios.delete(`/quiz`, { data: data });
};
const putUpdateUser = (id, username, email, password, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("roleCode", role);
  data.append("image", image);

  return axios.put("api/user", data);
};
const deleteUser = (userId) => {
  return axios.delete("api/user", { data: { id: userId } });
};
const postLogin = (username, password) => {
  return axios.post("api/auth/signin", { username, password });
};
const postSubmitQuiz = (quizId, data) => {
  return axios.post(`quiz/${quizId}`, data);
};
const postRegister = (fullname, username, email, avatar, password, roles) => {
  return axios.post("api/auth/signup", {
    fullname,
    username,
    email,
    avatar,
    password,
    roles,
  });
};
const postCreateNewQuiz = (namequiz, imagequiz, description) => {
  const data = new FormData();
  data.append("namequiz", namequiz);
  data.append("imagequiz", imagequiz);
  data.append("description", description);
  return axios.post(`quiz`, data);
};

const putUpdateQuizForAdmin = (id, namequiz, imagequiz, description) => {

  const data = new FormData();
  data.append("namequiz", namequiz);
  data.append("description", description);
  data.append("imagequiz", imagequiz);

  return axios.put(`quiz/${id}`, data);
};
const putUpdateQuiz = (id, username, email, password, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("roleCode", role);
  data.append("image", image);

  return axios.put("api/user", data);
};
export {
  postCreateNewUser,
  getAllusers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuiz,
  postSubmitQuiz,
  postCreateNewQuiz,
  putUpdateQuiz,
  getAllQuizForAdmin,
  putUpdateQuizForAdmin,
  deleteQuizForAdmin
};
