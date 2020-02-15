import React from 'react'
import { getVitals, checkDuplicate } from '../services/seleniumHelper'
import search from '../assets/search.png'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: null,
      currentProducts: [],
      dataLoading: false,
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
        this.setState({
          dataLoading: true
        })
        const req = await getVitals(this.state.ASIN, this.props.currentUser.id)
        this.setState({
          currentProducts: [req, ...this.state.currentProducts],
          dataLoading: false,
          errorText: false
        })
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
              <div className="data-wrapper">
                {
                  this.state.dataLoading &&
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
                  </div>
                )}
                {this.props.currentProducts &&
                  this.props.currentProducts.map((product, key) =>
                    <div className="single-data" key={key}>
                      <h1>{product.title}</h1>
                      <h2>{product.asin}</h2>
                      <img src={product.image}></img>
                      <h2>{product.price}</h2>
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