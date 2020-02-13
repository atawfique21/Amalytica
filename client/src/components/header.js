import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log(this.props.currentUser)
  }

  componentDidUpdate() {
    console.log(this.props.currentUser)
  }

  render() {
    return (
      <header>
        <div className="header-logo">
          <Link to="/">Amalytics</Link>
        </div>
        {!this.props.currentUser ?
          <div className="header-buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          :
          <div className="header-buttons">
            <Link to="/dashboard">Dashboard</Link>
            <Link onClick={this.props.handleLogout}>Logout</Link>
          </div>
        }
      </header>
    )
  }
}

export default withRouter(Header);