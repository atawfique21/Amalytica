import React from 'react'
import { getVitals, checkDuplicate, getBuyBox, getOffer } from '../services/seleniumHelper'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import search from '../assets/search.png'
import needmore from '../assets/needmore.png'
import refresh from '../assets/refresh.png'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: null,
      currentProducts: [],
      vitalDataLoading: false,
      buyBoxDataLoading: false,
      offerOneDataLoading: false,
      offerTwoDataLoading: false,
      errorText: false
    }
  }

  renderChart = (product) => {
    let final = []
    product.analytics.map(analytic => {
      let index = final.findIndex(obj => obj.seller === this.findSeller(analytic.seller))
      if (index === -1) {
        let ls = { seller: this.findSeller(analytic.seller), data: [] }
        for (let i = 0; i < product.analytics.length; i++) {
          if (analytic.seller === product.analytics[i].seller) {
            let newDate = Date.parse(product.analytics[i].created_at)
            let jsDate = new Date(newDate)

            let day = jsDate.getDate()
            let getmonth = jsDate.getMonth()
            let hour = jsDate.getHours()
            let minute = jsDate.getMinutes()

            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            month = month[getmonth]
            month = month[0] + month[1] + month[2]

            newDate = `${month} ${day}`
            let editedPrice = product.analytics[i].price.split('').slice(1, 6).join('')

            let ms = { date: newDate, price: parseFloat(editedPrice) }
            ls.data.push(ms)
          }
        }
        final.push(ls)
      }
    })
    product.buy_boxes.map(buybox => {
      let index = final.findIndex(obj => obj.seller === this.findSeller(buybox.seller))
      if (index === -1) {
        let ls = { seller: this.findSeller(buybox.seller), data: [] }
        for (let i = 0; i < product.buy_boxes.length; i++) {
          if (buybox.seller === product.buy_boxes[i].seller) {
            var newDate = Date.parse(product.buy_boxes[i].created_at)
            let jsDate = new Date(newDate)

            let day = jsDate.getDate()
            let getmonth = jsDate.getMonth()
            let hour = jsDate.getHours()
            let minute = jsDate.getMinutes()

            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            month = month[getmonth]
            month = month[0] + month[1] + month[2]

            newDate = `${month} ${day}`
            let editedPrice = product.buy_boxes[i].price.split('').slice(1, 6).join('')

            let ms = { date: newDate, price: parseFloat(editedPrice) }
            ls.data.push(ms)
          }
        }
        final.push(ls)
      }
    })

    var colorArray = ['#FF6633', '#FF33FF', '#00B3E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A']
    return (
      <LineChart width={430} height={215} syncId={`${product.asin}`}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="category" allowDuplicatedCategory={true} />
        <YAxis dataKey="price" type="number" domain={[(dataMin) => parseInt(dataMin - 2), (dataMax) => parseInt(dataMax + 2)]} allowDecimals={true} allowDataOverflow={true} />
        <Tooltip />
        <Legend />
        {final.map((datapoint, index) => (
          <Line dataKey="price" data={datapoint.data} name={datapoint.seller} key={datapoint.seller} stroke={colorArray[index]} strokeWidth="3px" />
        ))}
      </LineChart>
    )
  }

  renderSalesChart = (product) => {
    let final = []
    product.analytics.map(analytic => {
      let index = final.findIndex(obj => obj.seller === this.findSeller(analytic.seller))
      if (index === -1) {
        let ls = { seller: this.findSeller(analytic.seller), data: [] }
        for (let i = 0; i < product.analytics.length; i++) {
          if (analytic.seller === product.analytics[i].seller) {
            let newDate = Date.parse(product.analytics[i].created_at)
            let jsDate = new Date(newDate)

            let day = jsDate.getDate()
            let getmonth = jsDate.getMonth()
            let hour = jsDate.getHours()
            let minute = jsDate.getMinutes()

            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            month = month[getmonth]
            month = month[0] + month[1] + month[2]

            newDate = `${month} ${day}`
            let editedAvailable = this.findNumbers(product.analytics[i].available)

            let ms = { date: newDate, quantity: parseInt(editedAvailable) }
            ls.data.push(ms)
          }
        }
        final.push(ls)
      }
    })
    product.buy_boxes.map(buybox => {
      let index = final.findIndex(obj => obj.seller === this.findSeller(buybox.seller))
      if (index === -1) {
        let ls = { seller: this.findSeller(buybox.seller), data: [] }
        for (let i = 0; i < product.buy_boxes.length; i++) {
          if (buybox.seller === product.buy_boxes[i].seller) {
            var newDate = Date.parse(product.buy_boxes[i].created_at)
            let jsDate = new Date(newDate)

            let day = jsDate.getDate()
            let getmonth = jsDate.getMonth()
            let hour = jsDate.getHours()
            let minute = jsDate.getMinutes()

            var month = new Array();
            month[0] = "January";
            month[1] = "February";
            month[2] = "March";
            month[3] = "April";
            month[4] = "May";
            month[5] = "June";
            month[6] = "July";
            month[7] = "August";
            month[8] = "September";
            month[9] = "October";
            month[10] = "November";
            month[11] = "December";

            month = month[getmonth]
            month = month[0] + month[1] + month[2]

            newDate = `${month} ${day}`
            let editedAvailable = this.findNumbers(product.buy_boxes[i].available)

            let ms = { date: newDate, quantity: parseInt(editedAvailable) }
            ls.data.push(ms)
          }
        }
        final.push(ls)
      }
    })

    var colorArray = ['#FF6633', '#FF33FF', '#00B3E6', '#999966', '#99FF99', '#B34D4D', '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A']
    return (
      <LineChart width={430} height={215} syncId={`${product.asin}`}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" type="category" allowDuplicatedCategory={true} />
        <YAxis dataKey="quantity" type="number" domain={[(dataMin) => (dataMin - 5 < 0) ? 0 : parseInt(dataMin - 5), (dataMax) => (dataMax > 150) ? 150 : parseInt(dataMax + 5)]} allowDataOverflow={true} allowDecimals={true} />
        <Tooltip />
        <Legend />
        {final.map((analytics, index) => (
          <Line dataKey="quantity" data={analytics.data} name={analytics.seller} key={analytics.seller} stroke={colorArray[index]} strokeWidth="3px" />
        ))}
      </LineChart>
    )
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      ASIN: value
    })
  }

  findSeller = (string) => {
    let stringArr = string.split(' ')
    if (stringArr[0] === 'Ships') {
      let afterBy = string.split('by').pop().trim();
      let afterBySplit = afterBy.split('')
      if (afterBySplit[afterBySplit.length - 1] === '.') {
        afterBySplit.pop()
        afterBy = afterBySplit.join('')
        return afterBy
      } else {
        return afterBy;
      }
    } else if (stringArr[0] === 'Sold') {
      let first = string.split('Sold by').pop()
      let second = first.split('and').shift().trim();
      return second;
    } else if (stringArr[0] === 'Seller:') {
      let first = string.split('Seller:').pop()
      let second = first.split(',').shift().trim();
      return second;
    } else {
      return string
    }
  }

  findNumbers = (string) => {
    string.toString()
    let splitString = string.split(' ')
    if (splitString[4] === 'limit') {
      let numbers = string.match(/\d+/g).map(Number)
      return `${numbers} limit`
    }
    let numbers = string.match(/\d+/g).map(Number)
    return numbers
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
    return (
      <div>
        {
          !this.props.currentUser ?
            <div className="unauthorized">
              <h2>Please <a href="/login">login</a> to see the dashboard.</h2>
            </div> :
            < div className="dashboard" >
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
              <div className="data-wrapper">
                {
                  this.props.refreshing &&
                  <div className="single-data loading-wrapper">
                    <div className="loader">
                      <div className="line line1"></div>
                      <div className="line line2"></div>
                      <div className="line line3"></div>
                      <div className="line line4"></div>
                      <div className="line line5"></div>
                    </div>
                    <h3>Refreshing Data</h3>
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
                {this.state.currentProducts && this.state.currentProducts.map((product, key) =>
                  <div className="single-data" key={key}>
                    <h1>{product.title}</h1>
                    <h2>{product.asin}</h2>
                    <img src={product.image}></img>
                    <h2>{product.price}</h2>
                    <h3>Price History</h3>
                    <h6>VIA SELLER OVER TIME</h6>
                    <img className="need-more" src={needmore}></img>
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
                              <h4>{this.findNumbers(buybox.available)}</h4>
                            </div>
                          </div>
                          <h5>Sold By {this.findSeller(buybox.seller)}</h5>
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
                              <h4>{this.findNumbers(offer.available)}</h4>
                            </div>
                          </div>
                          <h5>{offer.condition} condition</h5>
                          <h5>Sold By {this.findSeller(offer.seller)}</h5>
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
                    < div className="single-data" key={key} >
                      <h1>{product.title}</h1>
                      <h2>{product.asin}</h2>
                      <img src={product.image}></img>
                      <h2>{product.price}</h2>
                      <div className="chart-wrapper">
                        <h3>Price History</h3>
                        <h6>VIA SELLER OVER TIME</h6>
                        {this.props.currentProducts && this.renderChart(product)}
                      </div>
                      <div className="chart-wrapper">
                        <h3>Quantity History</h3>
                        <h6>VIA SELLER OVER TIME</h6>
                        {this.props.currentProducts && this.renderSalesChart(product)}
                      </div>
                      {
                        product.buy_boxes &&
                        product.buy_boxes.map((buybox, key, arr) => {
                          if (arr.length - 1 === key) {
                            return (
                              <div className="single-buy-box" key={key}>
                                <h4>Buy Box</h4>
                                <div className="buy-box-details-wrapper">
                                  <div className="buy-box-details">
                                    <h3>Price</h3>
                                    <h4>{buybox.price}</h4>
                                  </div>
                                  <div className="buy-box-details">
                                    <h3>Available</h3>
                                    <h4>{this.findNumbers(buybox.available)}</h4>
                                  </div>
                                </div>
                                <h5>Sold By {this.findSeller(buybox.seller)}</h5>
                              </div>)
                          }
                        }

                        )
                      }
                      {
                        product.analytics &&
                        product.analytics.map((offer, key, arr) => {
                          if (arr.length - 2 === key || arr.length - 1 === key) {
                            return (
                              <div className="single-buy-box" key={key}>
                                <h4>Offer</h4>
                                <div className="buy-box-details-wrapper">
                                  <div className="buy-box-details">
                                    <h3>Price</h3>
                                    <h4>{offer.price}</h4>
                                  </div>
                                  <div className="buy-box-details">
                                    <h3>Available</h3>
                                    <h4>{this.findNumbers(offer.available)}</h4>
                                  </div>
                                </div>
                                <h5>{offer.condition} condition</h5>
                                <h5>Sold By {this.findSeller(offer.seller)}</h5>
                              </div>
                            )
                          }
                        }
                        )
                      }
                      <img src={refresh} onClick={(e) => this.props.handleRefresh(e, product)} className="refresh"></img>
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