import React from 'react'
import Axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: null
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({
      ASIN: value
    })
    console.log(this.state.ASIN)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('hi')
    Axios.get(`http://localhost:3001/${this.state.ASIN}`)
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
            </div >

        }
      </div>
    )
  }
}

export default Dashboard;