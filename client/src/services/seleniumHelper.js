import Axios from 'axios';

const api = Axios.create({
  baseURL: "http://localhost:3001"
})

export const checkDuplicate = async (ASIN) => {
  ASIN = ASIN.toUpperCase();
  const duplicate = await Axios.get(`http://localhost:3002/products/${ASIN}`)
  if (duplicate.data) {
    return true
  } else {
    return false
  }
}

export const getVitals = async (ASIN, user_id) => {
  user_id = parseInt(user_id)
  const resp = await api.get(`/vitals/${ASIN}`);
  let productData = {
    asin: ASIN,
    image: resp.data.image,
    title: resp.data.title,
    user_id: user_id,
    price: resp.data.buyboxprice
  }
  await Axios.post('http://localhost:3002/products', productData)
  return productData;
}