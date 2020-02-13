import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (
      <header>
        <div className="header-logo">
          <Link to="/">Amalytics</Link>
        </div>

        <div className="header-buttons">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </header>
    )
  }
}

export default withRouter(Header);