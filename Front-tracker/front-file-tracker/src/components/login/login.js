import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";

import "../login/assets/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      inputun: "",
      inputpw: "",
      loggedin: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  //get the user details from the databse via backend
  login() {
    var data = {
      uname: this.state.inputun,
      pw: this.state.inputpw
    };
    axios
      .post(`http://192.168.1.120:4000/login`, qs.stringify(data), {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(response => {
        if (response.data.tier === 1) {
          this.props.logged(true);
          window.location.href = "/file-tracker";
        } else if (response.data.tier > 1) {
          this.props.logged(false);
          alert("Unaouthorized to access!");
          window.location.href = "/";
        } else if (response.data.tier === "error") {
          this.props.logged(false);
          alert("Username or Password is incorrect!");
          window.location.href = "/";
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  }

  //get the input values into states to process
  handleInputChange() {
    this.setState({
      inputun: this.refs.inputun.value,
      inputpw: this.refs.inputpw.value
    });
  }

  //renders the page content
  render() {
    return (
      <div className="login-class">
        <div className="container-fluid text-center">
          <div className="offset-md-5">
            <div className="row">
              <div
                className="card col-sm-4"
                style={{ borderWidth: "15px", borderRadius: "10px" }}
              >
                <div className="thumbnail">
                  <div className="caption card-body">
                    <div
                      className="page-header box-header"
                      style={{ marginTop: 5 }}
                    >
                      <h2 style={{ color: "#1D1D1B", fontWeight: 610 }}>
                        File Monitoring System
                      </h2>
                      <p style={{ color: "#1D1D1B", fontWeight: 510 }}>
                        Please log in to continue.
                      </p>
                    </div>
                    <form
                      method="post"
                      className="formmargin"
                      id="login"
                      name="login"
                    >
                      <div className="form-group row">
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          placeholder="Username"
                          onChange={this.handleInputChange}
                          ref="inputun"
                          name="username"
                          tabIndex="1"
                        />
                        <label></label>
                      </div>
                      <div className="form-group row">
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Password"
                          onChange={this.handleInputChange}
                          ref="inputpw"
                          name="password"
                          tabIndex="2"
                        />
                      </div>
                      <div className="form-group row">
                        <div
                          className="col-sm-8 offset-md-2"
                          style={{ marginBottom: 25, marginTop: 10 }}
                        >
                          <div
                            onClick={() => {
                              this.login();
                            }}
                            className="btn btn-info active btn-lg"
                            tabIndex="3"
                          >
                            Log In
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
