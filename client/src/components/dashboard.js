import React from 'react'
import { getVitals, checkDuplicate, getBuyBox, getOffer } from '../services/seleniumHelper'
import search from '../assets/search.png'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: null,
      currentProducts: [],
      currentBuyBoxes: [],
      vitalDataLoading: false,
      buyBoxDataLoading: false,
      offerOneDataLoading: false,
      offerTwoDataLoading: false,
      buyBoxCounter: -1,
      errorText: false
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      ASIN: value
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    if (!this.state.ASIN) {
      this.setState({
        errorText: "Please enter an ASIN."
      })
    } else if (this.state.ASIN.length !== 10) {
      this.setState({
        errorText: "Please enter a valid ASIN."
      })
    } else {

      const duplicateReq = await checkDuplicate(this.state.ASIN)

      if (duplicateReq) {
        this.setState({
          errorText: "Please enter a unique ASIN, this one is already in the database."
        })
        return
      } else {
        // VITAL DATA LOADING
        this.setState({
          vitalDataLoading: true,
          errorText: false
        })
        const vitalsReq = await getVitals(this.state.ASIN, this.props.currentUser.id)
        this.setState({
          currentProducts: [vitalsReq, ...this.state.currentProducts],
          vitalDataLoading: false,
          buyBoxDataLoading: true
        })
        // VITAL DATA LOADING
        // BUY BOX DATA LOADING
        const buyBoxReq = await getBuyBox(this.state.ASIN)
        let currentProducts = [...this.state.currentProducts]
        let index = currentProducts.findIndex(obj => obj.asin.toLowerCase() === this.state.ASIN.toLowerCase());
        currentProducts[index].buy_boxes = [{ ...buyBoxReq }]
        this.setState({ currentProducts, buyBoxDataLoading: false })
        // BUY BOX DATA LOADING
        // OFFERS LOADING
        if (vitalsReq.sellers.length === 3) {

          this.setState({ offerOneDataLoading: true })
          const offerReq1 = await getOffer(this.state.ASIN, 1)
          let currentProducts = [...this.state.currentProducts]
          let index = currentProducts.findIndex(obj => obj.asin.toLowerCase() === this.state.ASIN.toLowerCase());
          currentProducts[index].offers = [{ ...offerReq1 }]
          this.setState({ currentProducts, offerOneDataLoading: false, offerTwoDataLoading: true })


          const offerReq2 = await getOffer(this.state.ASIN, 2)
          currentProducts = [...this.state.currentProducts]
          index = currentProducts.findIndex(obj => obj.asin.toLowerCase() === this.state.ASIN.toLowerCase());
          currentProducts[index].offers = [...currentProducts[index].offers, { ...offerReq2 }]
          this.setState({ currentProducts, offerTwoDataLoading: false })


        } else if (vitalsReq.sellers.length === 2) {
          const offerReq1 = await getOffer(this.state.ASIN, 1)
          let products = [...this.state.currentProducts]
          let index = products.findIndex(obj => obj.asin.toLowerCase() === this.state.ASIN.toLowerCase());
          products[index].products = [...products[index].products, { ...offerReq1 }]
        } else {
          return
        }
        // OFFERS LOADING
        return;
      }
    }
  }

  render() {
    function findNumbers(string) {
      string.toString()
      let numbers = string.match(/\d+/g).map(Number)
      return numbers
    }

    function lastWord(string) {
      let n = string.split(" ");
      n = n[n.length - 1];
      if (n[n.length - 1] === ".") {
        return n.slice(0, -1)
      } else {
        return n
      }
    }
    return (
      <div>
        {
          !this.props.currentUser ?
            <div className="unauthorized">
              <h2>Please <a href="/login">login</a> to see the dashboard.</h2>
            </div> :
            < div className="dashboard" >
              <h1>Hello, {this.props.currentUser.name}</h1>
              <form className="asin-search-form" onSubmit={(e) => { this.handleSubmit(e) }}>
                <input
                  type="text"
                  placeholder="Enter ASIN..."
                  className="search"
                  onChange={(e) => { this.handleChange(e) }}
                  onSubmit={(e) => { this.handleSubmit(e) }}
                />
                <img
                  src={search}
                  onClick={(e) => { this.handleSubmit(e) }}
                />
                <input
                  type="submit"
                  className="search-button"
                  onSubmit={(e) => { this.handleSubmit(e) }}
                />
              </form>
              {this.state.errorText &&
                <div className="alert-danger">
                  <h3>{this.state.errorText}</h3>
                </div>
              }
              {
                this.state.vitalDataLoading &&
                <div className="single-data loading-wrapper">
                  <div className="loader">
                    <div className="line line1"></div>
                    <div className="line line2"></div>
                    <div className="line line3"></div>
                    <div className="line line4"></div>
                    <div className="line line5"></div>
                  </div>
                  <h3>Getting vital product data for ASIN:</h3>
                  <h4>{this.state.ASIN}</h4>
                </div>
              }
              <div className="data-wrapper">
                {this.state.currentProducts && this.state.currentProducts.map((product, key) =>
                  <div className="single-data" key={key}>
                    <h1>{product.title}</h1>
                    <h2>{product.asin}</h2>
                    <img src={product.image}></img>
                    <h2>{product.price}</h2>
                    {this.state.buyBoxDataLoading &&
                      <div className="loading-wrapper">
                        <div className="loader">
                          <div className="line line1"></div>
                          <div className="line line2"></div>
                          <div className="line line3"></div>
                          <div className="line line4"></div>
                          <div className="line line5"></div>
                        </div>
                        <h3>Getting buy box data</h3>
                      </div>
                    }
                    {product.buy_boxes &&
                      product.buy_boxes.map((buybox, key) =>
                        <div className="single-buy-box" key={key}>
                          <h4>Buy Box</h4>
                          <div className="buy-box-details-wrapper">
                            <div className="buy-box-details">
                              <h3>Price</h3>
                              <h4>{buybox.price}</h4>
                            </div>
                            <div className="buy-box-details">
                              <h3>Available</h3>
                              <h4>{findNumbers(buybox.available)}</h4>
                            </div>
                          </div>
                          <h5>Sold By {lastWord(buybox.seller)}</h5>
                        </div>
                      )
                    }
                    {this.state.offerOneDataLoading &&
                      <div className="loading-wrapper">
                        <div className="loader">
                          <div className="line line1"></div>
                          <div className="line line2"></div>
                          <div className="line line3"></div>
                          <div className="line line4"></div>
                          <div className="line line5"></div>
                        </div>
                        <h3>Getting offer 1 data</h3>
                      </div>
                    }
                    {product.offers &&
                      product.offers.map((offer, key) =>
                        <div className="single-buy-box" key={key}>
                          <h4>Offer {key + 1}</h4>
                          <div className="buy-box-details-wrapper">
                            <div className="buy-box-details">
                              <h3>Price</h3>
                              <h4>{offer.price}</h4>
                            </div>
                            <div className="buy-box-details">
                              <h3>Available</h3>
                              <h4>{findNumbers(offer.available)}</h4>
                            </div>
                          </div>
                          <h5>{offer.condition} condition</h5>
                          <h5>Sold By {lastWord(offer.seller)}</h5>
                        </div>
                      )
                    }
                    {this.state.offerTwoDataLoading &&
                      <div className="loading-wrapper">
                        <div className="loader">
                          <div className="line line1"></div>
                          <div className="line line2"></div>
                          <div className="line line3"></div>
                          <div className="line line4"></div>
                          <div className="line line5"></div>
                        </div>
                        <h3>Getting offer 2 data</h3>
                      </div>
                    }
                  </div>
                )}
                {this.props.currentProducts &&
                  this.props.currentProducts.map((product, key) =>
                    <div className="single-data" key={key}>
                      <h1>{product.title}</h1>
                      <h2>{product.asin}</h2>
                      <img src={product.image}></img>
                      <h2>{product.price}</h2>
                      {product.buy_boxes &&
                        product.buy_boxes.map((buybox, key) =>
                          <div className="single-buy-box" key={key}>
                            <h4>Buy Box</h4>
                            <div className="buy-box-details-wrapper">
                              <div className="buy-box-details">
                                <h3>Price</h3>
                                <h4>{buybox.price}</h4>
                              </div>
                              <div className="buy-box-details">
                                <h3>Available</h3>
                                <h4>{findNumbers(buybox.available)}</h4>
                              </div>
                            </div>
                            <h5>Sold By {lastWord(buybox.seller)}</h5>
                          </div>
                        )
                      }
                      {product.analytics &&
                        product.analytics.map((offer, key) =>
                          <div className="single-buy-box" key={key}>
                            <h4>Offer {key + 1}</h4>
                            <div className="buy-box-details-wrapper">
                              <div className="buy-box-details">
                                <h3>Price</h3>
                                <h4>{offer.price}</h4>
                              </div>
                              <div className="buy-box-details">
                                <h3>Available</h3>
                                <h4>{findNumbers(offer.available)}</h4>
                              </div>
                            </div>
                            <h5>{offer.condition} condition</h5>
                            <h5>Sold By {lastWord(offer.seller)}</h5>
                          </div>
                        )
                      }
                    </div>
                  )
                }
              </div>
            </div >
        }
      </div>
    )
  }
}

export default Dashboard;