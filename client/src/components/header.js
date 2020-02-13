import React from 'react'

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
          <h1>Amalytics</h1>
        </div>

        <div className="header-buttons">
          <h4>Login</h4>
          <h4>Register</h4>
        </div>
      </header>
    )
  }
}

export default Header;