import axios from "axios";

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

const putUpdateUser = (id, username, role, image) => {
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
export {
  postCreateNewUser,
  getAllusers,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
};
