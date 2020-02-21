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
  console.log(resp)
  ASIN = ASIN.toLowerCase()
  let productData = {
    asin: ASIN,
    image: resp.data.image,
    title: resp.data.title,
    sellers: resp.data.offers,
    user_id: user_id,
    price: resp.data.buyboxprice,
    buy_boxes: null,
    offers: null,
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
  let rbm = await Axios.post('http://localhost:3002/buybox', productData)
  return rbm.data
}

export const getOffer = async (ASIN, offerNum) => {
  const resp = await api.get(`/offer/${ASIN}/${offerNum}`)
  ASIN = ASIN.toUpperCase()
  let productData = {
    product_asin: ASIN,
    seller: resp.data.storename,
    price: resp.data.price,
    condition: resp.data.condition,
    available: resp.data.sellerqty
  }
  let rbm = await Axios.post('http://localhost:3002/analytics', productData)
  return rbm.data
}