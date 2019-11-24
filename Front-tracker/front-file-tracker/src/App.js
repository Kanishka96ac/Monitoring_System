// eslint-disable-next-line
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Login from "./components/login/login";
import FileTracker from "./components/file-tracking-frontend/file-tracking";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false
    };
  }

  componentWillMount() {
    localStorage.getItem("logged") &&
      this.setState({
        logged: JSON.parse(localStorage.getItem("logged"))
      });
    if (window.location.pathname === "/file-tracker") {
      if (!JSON.parse(localStorage.getItem("logged"))) {
        window.location.href = "/";
      }
    }
  }

  componentDidMount() {
    if (!localStorage.getItem("logged")) {
      this.setState({
        logged: false
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("logged", JSON.stringify(nextState.logged));
  }

  render() {
    return (
      <div className="app_class">
        <Router>
          <Route
            path="/"
            exact
            strict
            render={() => {
              return (
                <Login
                  logged={e =>
                    this.setState({
                      logged: e
                    })
                  }
                />
              );
            }}
          />
          <Route
            path="/file-tracker"
            exact
            strict
            render={() => {
              return <FileTracker />;
            }}
          />
        </Router>
      </div>
    );
  }
}

export default App;
