import React from 'react';
import './App.css';
import Axios from 'axios'
import amalytics2 from './assets/amalytics2.mp4'
import cloud from './assets/cloud.png'
import fast from './assets/fast.png'
import select from './assets/select.png'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: ""
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
      <div className="App">
        <div className="Heading">
          <h1>The World Revolves Around Data</h1>
          <div className="browser-mockup">
            <video autoPlay loop muted width="100%" height="50%">
              <source src={amalytics2} type="video/mp4" />
              Your browser does not support the video tag.
          </video>
          </div>
          <h2>Amalytica harness the power of modern tech to harvest data for Amazon Sellers.</h2>
        </div>
        <div className="Features">
          <div className="single-feature">
            <img src={fast}></img>
            <h3>Lightning Data</h3>
          </div>
          <div className="single-feature">
            <img src={select}></img>
            <h3>Data for any Asin</h3>
          </div>
          <div className="single-feature">
            <img src={cloud}></img>
            <h3>Server-sided Harvesting</h3>
          </div>
        </div>
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
    );
  }
}

export default App;
