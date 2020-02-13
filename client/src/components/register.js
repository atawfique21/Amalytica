import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      username: '',
      password: '',
    }
  }


  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="auth">
        <form className="login-form" onSubmit={(e) => this.props.handleRegister(e, { name: this.state.name, username: this.state.username, password: this.state.password })}>
          <h2>Join Amalytics</h2>
          {this.props.errorText && <p className="error-text">{this.props.errorText}</p>}
          <span className="field">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </span>
          <span className="field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
          </span>
          <span className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </span>
          <input type="submit" className="submit" value="Register" />
        </form>
        <div className="header-buttons-container redirect">
          <Link to="/login">Already have an account?</Link>
        </div>
      </div>
    )
  }
}