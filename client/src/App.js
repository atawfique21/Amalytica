import React from 'react';
import './App.css';
import Header from './components/header'
import Landing from './components/landing'
import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard'
import Footer from './components/footer'
import { Route, withRouter } from 'react-router-dom'
import { loginUser, registerUser, verifyUser, getProducts } from './services/apiHelper'
import { getBuyBox, getOffer } from './services/seleniumHelper'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errorText: "",
      currentUser: null,
      currentProducts: null,
      refreshing: false
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

  componentDidMount = async () => {
    verifyUser();
    if (localStorage.getItem('authToken')) {
      const authToken = localStorage.getItem('authToken')
      const name = localStorage.getItem('name');
      const username = localStorage.getItem('username');
      const id = localStorage.getItem('id');
      const user = { authToken, name, username, id };
      user && this.setState({
        currentUser: user
      })
      const currentProducts = await getProducts(id);
      this.setState({
        currentProducts
      })
    }
  }

  handleRefresh = async (e, product) => {
    e.preventDefault()
    let currentProducts = this.state.currentProducts
    let index = currentProducts.findIndex(obj => obj.asin === product.asin)
    let productToUpdate = currentProducts.splice(index, 1)
    console.log(productToUpdate)

    this.setState({ currentProducts, refreshing: true })

    const buyBoxReq = await getBuyBox(productToUpdate[0].asin)
    productToUpdate[0].buy_boxes.push(buyBoxReq)

    const offerReq1 = await getOffer(productToUpdate[0].asin, 1)
    productToUpdate[0].analytics.push(offerReq1)

    const offerReq2 = await getOffer(productToUpdate[0].asin, 2)
    productToUpdate[0].analytics.push(offerReq2)

    currentProducts = [...productToUpdate, ...currentProducts]

    this.setState({ currentProducts, refreshing: false })
    // .pop product from this.state.products and instead, put up a div that says data is refreshing... (through this.props.data refreshing)
    // push the new buy box data & offer data into the product's buy_boxes, analytics
    // send data to backend through axios.post /analytics, /buybox
    // set state w/ product with unshift so it appears in the front and remove true in this.props.datarefreshing 
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
          <Dashboard currentUser={this.state.currentUser} currentProducts={this.state.currentProducts} handleRefresh={this.handleRefresh} refreshing={this.state.refreshing} />
        )} />

        <Footer />
      </div >
    );
  }
}

export default withRouter(App);
