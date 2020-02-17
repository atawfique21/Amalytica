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
  ASIN = ASIN.toLowerCase()
  let productData = {
    asin: ASIN,
    image: resp.data.image,
    title: resp.data.title,
    user_id: user_id,
    price: resp.data.buyboxprice
  }
  await Axios.post('http://localhost:3002/products', productData)
  return productData
}

export const getBuyBox = async (ASIN) => {
  const resp = await api.get(`/buybox/${ASIN}`);
  ASIN = ASIN.toUpperCase()
  let productData = {
    product_asin: ASIN,
    price: resp.data.buyboxprice,
    seller: resp.data.buyboxseller,
    available: resp.data.buyboxqty,

  }
  console.log(productData)
  await Axios.post('http://localhost:3002/buybox', productData)
  return productData
}