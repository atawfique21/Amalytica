import Axios from 'axios';

const api = Axios.create({
  baseURL: "http://localhost:3002"
})

export const loginUser = async (loginData) => {
  const resp = await api.post('/auth/login', loginData);
  console.log(resp)
  localStorage.setItem('authToken', resp.data.auth_token);
  localStorage.setItem('name', resp.data.name);
  localStorage.setItem('username', resp.data.username);
  localStorage.setItem('id', resp.data.id);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data;
}

export const registerUser = async (registerData) => {
  const resp = await api.post('/signup', registerData);
  localStorage.setItem('authToken', resp.data.auth_token);
  localStorage.setItem('name', resp.data.name);
  localStorage.setItem('username', resp.data.username);
  localStorage.setItem('id', resp.data.id);
  api.defaults.headers.common.authorization = `Bearer ${resp.data.token}`;
  return resp.data;
}

export const verifyUser = () => {
  const token = localStorage.getItem('authToken');
  if (token) {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
  }
}

export const getProducts = async (userId) => {
  const resp = await api.get(`/products/user/${userId}`)
  return resp.data;
}