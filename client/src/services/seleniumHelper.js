import Axios from 'axios';

const api = Axios.create({
  baseURL: "http://localhost:3001"
})

export const getProductData = async (ASIN, user_id) => {
  user_id = parseInt(user_id)
  const resp = await api.get(`/${ASIN}`);
  // console.log(resp.data.rel)
  let productData = {
    asin: ASIN,
    image: resp.data.rel.img,
    title: resp.data.rel.title,
    user_id: user_id
  }
  // productData = JSON.stringify(productData)

  await Axios.post('http://localhost:3002/products', productData)
  return productData;
}