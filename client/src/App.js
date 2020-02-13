import React from 'react';
import './App.css';
import Axios from 'axios'
import Header from './components/header'
import Landing from './components/landing'
import { Route, withRouter } from 'react-router-dom'


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
        <Header />
        <Route exact path="/" render={() => (
          <Landing />
        )} />
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

export default withRouter(App);
