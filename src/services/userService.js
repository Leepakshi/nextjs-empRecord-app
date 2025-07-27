import api from "./apiService";

export const getUsers = async () => {
  const response = await api.get("api/users");
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("api/users", userData);
  return response.data;
};

export const getUserDetails = async (id) => {
  const response = await api.get(`api/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`api/users/${id}`, userData);
};

export const deleteUser = async (id) => {
  const response = await api.delete(`api/users/${id}`);
  return response.data;
};
