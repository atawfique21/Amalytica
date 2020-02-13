import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: this.props.currentUser
    }
  }

  render() {
    return (
      <header>
        <div className="header-logo">
          <Link to="/">Amalytics</Link>
        </div>
        {this.state.currentUser ?
          <div className="header-buttons">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          :
          <div className="header-buttons">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/logout">Logout</Link>
          </div>
        }

      </header>
    )
  }
}

export default withRouter(Header);