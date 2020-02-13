import React from 'react';
import './App.css';
import Header from './components/header'
import Landing from './components/landing'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'
import { Route, withRouter } from 'react-router-dom'
import { loginUser, registerUser, verifyUser } from './services/apiHelper'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
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

  handleRegister = async (e, registerData) => {
    e.preventDefault();
    if (!registerData.name || !registerData.username || !registerData.password) {
      this.setState({
        errorText: "Please check blank fields!"
      })
    } else {
      const currentUser = await registerUser(registerData);
      this.setState({
        currentUser,
        errorText: ''
      })
      this.props.history.push('/dashboard');
    }
  }

  handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    this.setState({
      currentUser: null
    })
    this.props.history.push('/');
  }

  componentDidMount() {
    verifyUser();
    if (localStorage.getItem('authToken')) {
      const name = localStorage.getItem('name');
      const username = localStorage.getItem('username');
      const user = { name, username };
      user && this.setState({
        currentUser: user
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Header currentUser={this.state.currentUser} handleLogout={this.handleLogout} />

        <Route exact path="/" render={() => (
          <Landing />
        )} />

        <Route path="/login" render={() => (
          <Login handleLogin={this.handleLogin} errorText={this.state.errorText} currentUser={this.state.currentUser} />
        )} />

        <Route path="/register" render={() => (
          <Register handleRegister={this.handleRegister} errorText={this.state.errorText} currentUser={this.state.currentUser} />
        )} />

        <Route path="/dashboard" render={() => (
          <Dashboard currentUser={this.state.currentUser} />
        )} />



      </div >
    );
  }
}

export default withRouter(App);
