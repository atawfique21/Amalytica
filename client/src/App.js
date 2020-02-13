import React from 'react';
import './App.css';
import Axios from 'axios'
import Header from './components/header'
import Landing from './components/landing'
import Login from './components/login'
import { Route, withRouter } from 'react-router-dom'
import { loginUser } from './services/apiHelper'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ASIN: "",
      errorText: "",
      currentUser: null
    }
  }

  handleLogin = async (e, loginData) => {
    e.preventDefault();

    if (!loginData.username || !loginData.password) {
      this.setState({
        errorText: "Please enter Username & Password!"
      })
    } else {
      try {
        const currentUser = await loginUser(loginData);
        this.setState({ currentUser })
        this.setState({
          errorText: ''
        })
        this.props.history.push('/dashboard');
      } catch (e) {
        console.log(e.message)
        if (e.message === "Request failed with status code 401") {
          e.message = "Wrong username or password"
          this.setState({
            errorText: e.message
          })
        } else {
          this.setState({
            errorText: e.message
          })
        }
      }
    }
  }

  componentDidMount() {
    console.log(this.state.currentUser)

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
        <Header currentUser={this.state.currentUser} />
        <Route exact path="/" render={() => (
          <Landing />
        )} />
        <Route path="/login" render={() => (
          <Login handleLogin={this.handleLogin} errorText={this.state.errorText} currentUser={this.state.currentUser} />
        )} />

        <Route path="/dashboard" render={() => (
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
        )} />
      </div >
    );
  }
}

export default withRouter(App);
