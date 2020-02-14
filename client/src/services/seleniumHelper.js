import Axios from 'axios';

const api = Axios.create({
  baseURL: "http://localhost:3001"
})

export const getVitals = async (ASIN, user_id) => {
  user_id = parseInt(user_id)
  const resp = await api.get(`/vitals/${ASIN}`);
  console.log(resp)
  // console.log(resp.data.rel)
  let productData = {
    asin: ASIN,
    image: resp.data.image,
    title: resp.data.title,
    user_id: user_id,
    price: resp.data.buyboxprice
  }
  // productData = JSON.stringify(productData)

  await Axios.post('http://localhost:3002/products', productData)
  return productData;
}