import React from 'react'
import { getProductData } from '../services/seleniumHelper'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: null,
      currentProducts: []
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
    const req = await getProductData(this.state.ASIN, this.props.currentUser.id)
    this.setState({
      currentProducts: [...this.state.currentProducts, req]
    })
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
              {this.props.currentProducts &&
                <div className="data-wrapper">
                  {this.props.currentProducts.map((product, key) =>
                    <div className="single-data" key={key}>
                      <h1>{product.title}</h1>
                      <h2>{product.asin}</h2>
                      <div className="browser-mockup">
                        <h3>{product.image}</h3>
                      </div>
                    </div>
                  )}
                  {this.state.currentProducts && this.state.currentProducts.map((product, key) =>
                    <div className="single-data" key={key}>
                      <h1>{product.title}</h1>
                      <h2>{product.asin}</h2>
                      <div className="browser-mockup">
                        <h3>{product.image}</h3>
                      </div>
                    </div>
                  )}
                </div>
              }
            </div >
        }
      </div>
    )
  }
}

export default Dashboard;