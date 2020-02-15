import React from 'react'
import { getVitals, checkDuplicate } from '../services/seleniumHelper'

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

    // await checkDuplicate(this.state.ASIN)
    //   .then(function (response) {
    //     this.setState({
    //       errorText: "Please enter a unique ASIN, this one is already in the database."
    //     })
    //     return;
    //   })
    //   .catch(async function (error) {
    //     this.setState({
    //       dataLoading: true
    //     })
    //     const req = await getVitals(this.state.ASIN, this.props.currentUser.id)
    //     this.setState({
    //       currentProducts: [req, ...this.state.currentProducts],
    //       dataLoading: false,
    //       errorText: false
    //     })
    //     return;
    //   })

    // try {
    //   await checkDuplicate(this.state.ASIN)

    // } catch (e) {
    //   console.log(e)

    // }

    // console.log(duplicateReq.data)
    // if (!duplicateReq.data) {

    // } else {

    // }
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
              <form onSubmit={(e) => { this.handleSubmit(e) }}>
                <input
                  type="text"
                  onChange={(e) => { this.handleChange(e) }}
                  onSubmit={(e) => { this.handleSubmit(e) }}
                />
                <input
                  type="submit"
                  onSubmit={(e) => { this.handleSubmit(e) }}
                />
              </form>
              <div className="data-wrapper">
                {this.state.errorText &&
                  <h3>{this.state.errorText}</h3>
                }
                {
                  this.state.dataLoading &&
                  <div className="single-data loading-wrapper">
                    {/* <img src={Spinner}></img> */}
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
                }
              </div>
            </div >
        }
      </div>
    )
  }
}

export default Dashboard;