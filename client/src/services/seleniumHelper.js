import Axios from 'axios';

const api = Axios.create({
  baseURL: "http://localhost:3001"
})

export const getProductData = async (ASIN) => {
  const resp = await api.get(`/${ASIN}`);
  console.log(resp)
}