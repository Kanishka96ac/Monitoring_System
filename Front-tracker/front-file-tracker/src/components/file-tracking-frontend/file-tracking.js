// eslint-disable-next-line
import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { Tabs, Tab, Form, Button, Modal, ButtonToolbar } from "react-bootstrap";

import "./assets/file-tracking.css";

class FileTracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      add_logs: [],
      change_logs: [],
      unlink_logs: [],
      addDir_logs: [],
      unlinkDir_logs: [],
      error_logs: [],
      ready_logs: [],
      date: "",
      ip: "",
      name: "",
      active: "",
      key: "home",
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  async handleClose() {
    await this.setState({ show: false });
    await setTimeout(() => {
      this.getData();
    }, 1000);
    await ReactDOM.findDOMNode(this.form1).reset();
    await ReactDOM.findDOMNode(this.form2).reset();
    await ReactDOM.findDOMNode(this.form3).reset();
    await ReactDOM.findDOMNode(this.form4).reset();
    await ReactDOM.findDOMNode(this.form5).reset();
    await ReactDOM.findDOMNode(this.form6).reset();
    await ReactDOM.findDOMNode(this.form7).reset();
  }

  async handleShow(e) {
    e.preventDefault();
    await this.setState({ show: true });
  }

  // 0: "log : 2019-06-23 21:33:12 : 172.28.2.157 : File D:\trackNew Text Document.txt has been removed";
  // 1: "log : 2019-06-24 22:28:31 : 192.168.8.100 : File D:\trackNew folder\niran.txt has been removed";
  // 2: "log : 2019-06-24 22:28:31 : 192.168.8.100 : File D:\trackNew folderNew Text Document.txt has been removed";
  // 3: "log : 2019-06-24 22:28:31 : 192.168.8.100 : File D:\trackdfdf.txt has been removed";
  // 4: "log : 2019-06-24 22:28:31 : 192.168.8.100 : File D:\trackdsdd.txt has been removed";
  // 5: "log : 2019-06-24 22:28:31 : 192.168.8.100 : File D:\track\new new.txt has been removed";
  // 6: "log : 2019-06-25 02:59:58 : 192.168.8.100 : File D:\trackNew Text Document.txt has been removed";

  async getData() {
    await axios
      .get(`http://192.168.1.120:4000/addlogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        this.setState({
          add_logs: resp.data.File_add_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });

    await axios
      .get(`http://192.168.1.120:4000/changelogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        console.log();
        this.setState({
          change_logs: resp.data.File_change_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });

    await axios
      .get(`http://192.168.1.120:4000/unlinklogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        this.setState({
          unlink_logs: resp.data.File_unlink_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });

    await axios
      .get(`http://192.168.1.120:4000/addDirlogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        this.setState({
          addDir_logs: resp.data.File_addDir_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });

    await axios
      .get(`http://192.168.1.120:4000/unlinkDirlogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        this.setState({
          unlinkDir_logs: resp.data.File_unlinkDir_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });

    await axios
      .get(`http://192.168.1.120:4000/errorlogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        this.setState({
          error_logs: resp.data.File_error_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });

    await axios
      .get(`http://192.168.1.120:4000/readylogs`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(async resp => {
        this.setState({
          ready_logs: resp.data.File_ready_logs.result
        });
      })
      .catch(err => {
        alert("Something went wrong!");
        window.location.reload();
      });
  }

  async sortByDate(date) {
    if (this.state.key === "dradded") {
      var log = this.state.addDir_logs;
      await this.setState({
        addDir_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            addDir_logs: this.state.addDir_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "drremoved") {
      var log = this.state.unlinkDir_logs;
      await this.setState({
        unlinkDir_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            unlinkDir_logs: this.state.unlinkDir_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "fladded") {
      var log = this.state.add_logs;
      await this.setState({
        add_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            add_logs: this.state.add_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "flremoved") {
      var log = this.state.unlink_logs;
      await this.setState({
        unlink_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            unlink_logs: this.state.unlink_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "flchanged") {
      var log = this.state.change_logs;
      await this.setState({
        change_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            change_logs: this.state.change_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "ferrlogs") {
      var log = this.state.error_logs;
      await this.setState({
        error_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            error_logs: this.state.error_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "freadylogs") {
      var log = this.state.ready_logs;
      await this.setState({
        ready_logs: []
      });
      var d2 = new Date(date);
      await log.map(async (data, i) => {
        var d1 = new Date(data.value.split(":")[1].split(" ")[1]);
        if (d2.getDate() === d1.getDate()) {
          await this.setState({
            ready_logs: this.state.ready_logs.concat(data)
          });
        }
      });
    } else {
      alert("Something went wrong!");
    }
  }

  async sortByIP(IP) {
    if (this.state.key === "dradded") {
      var log = this.state.addDir_logs;
      await this.setState({
        addDir_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            addDir_logs: this.state.addDir_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "drremoved") {
      var log = this.state.unlinkDir_logs;
      await this.setState({
        unlinkDir_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            unlinkDir_logs: this.state.unlinkDir_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "fladded") {
      var log = this.state.add_logs;
      await this.setState({
        add_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            add_logs: this.state.add_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "flremoved") {
      var log = this.state.unlink_logs;
      await this.setState({
        unlink_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            unlink_logs: this.state.unlink_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "flchanged") {
      var log = this.state.change_logs;
      await this.setState({
        change_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            change_logs: this.state.change_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "ferrlogs") {
      var log = this.state.error_logs;
      await this.setState({
        error_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            error_logs: this.state.error_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "freadylogs") {
      var log = this.state.ready_logs;
      await this.setState({
        ready_logs: []
      });
      await log.map(async (data, i) => {
        var _ip = data.value.split(":")[4].split(" ")[1];
        if (_ip === IP) {
          await this.setState({
            ready_logs: this.state.ready_logs.concat(data)
          });
        }
      });
    } else {
      alert("Something went wrong!");
    }
  }

  async sortByName(name) {
    if (this.state.key === "dradded") {
      var log = this.state.addDir_logs;
      await this.setState({
        addDir_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            addDir_logs: this.state.addDir_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "drremoved") {
      var log = this.state.unlinkDir_logs;
      await this.setState({
        unlinkDir_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            unlinkDir_logs: this.state.unlinkDir_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "fladded") {
      var log = this.state.add_logs;
      await this.setState({
        add_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            add_logs: this.state.add_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "flremoved") {
      var log = this.state.unlink_logs;
      await this.setState({
        unlink_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            unlink_logs: this.state.unlink_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "flchanged") {
      var log = this.state.change_logs;
      await this.setState({
        change_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            change_logs: this.state.change_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "ferrlogs") {
      var log = this.state.error_logs;
      await this.setState({
        error_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            error_logs: this.state.error_logs.concat(data)
          });
        }
      });
    } else if (this.state.key === "freadylogs") {
      var log = this.state.ready_logs;
      await this.setState({
        ready_logs: []
      });
      await log.map(async (data, i) => {
        var logdata = data.value;
        if (logdata.includes(name)) {
          await this.setState({
            ready_logs: this.state.ready_logs.concat(data)
          });
        }
      });
    } else {
      alert("Something went wrong!");
    }
  }

  sort(e, type) {
    if (type === "date") {
      this.sortByDate(e);
    } else if (type === "ip") {
      this.sortByIP(e);
    } else if (type === "name") {
      this.sortByName(e);
    } else {
      alert("Please fill only one field");
    }
  }

  async componentWillMount() {
    (await localStorage.getItem("key")) &&
      this.setState({
        key: JSON.parse(localStorage.getItem("key"))
      });
    await this.getData();
  }

  componentDidMount() {
    if (!localStorage.getItem("key")) {
      this.setState({
        key: "home"
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem("key", JSON.stringify(nextState.key));
  }

  render() {
    var value_add = this.state.add_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.&nbsp;&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    var value_change = this.state.change_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.)&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    var value_unlink = this.state.unlink_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.)&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    var value_addDir = this.state.addDir_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.)&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    var value_unlinkDir = this.state.unlinkDir_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.)&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    var value_error = this.state.error_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.)&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    var value_ready = this.state.ready_logs.map((data, i) => {
      return (
        <h6 style={{ textAlign: "left" }} key={i}>
          {i + 1}.)&nbsp;&nbsp;&nbsp;{data.value}
        </h6>
      );
    });
    return (
      <div className="App">
        <button
          onClick={() => (
            localStorage.setItem("logged", false), (window.location.href = "/")
          )}
          className="btn btn-sm btn-warning"
          style={{
            position: "absolute",
            right: "10px",
            top: "5px",
          }}
        >
          Log out
        </button>
        <Tabs
          id="controlled-tab-example"
          activeKey={this.state.key}
          onSelect={key => this.setState({ key })}
        >
          <Tab eventKey="home" title="Home">
            <div className="App text-center" style={{ textAlign: "center" }}>
              <div
                className="modal fade bd-example-modal-lg"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        {this.state.active + " Details"}
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      {this.state.active === "Directory Added"
                        ? value_addDir
                        : this.state.active === "Directory Removed"
                        ? value_unlinkDir
                        : this.state.active === "File Added"
                        ? value_add
                        : this.state.active === "File Changed"
                        ? value_change
                        : this.state.active === "File Removed"
                        ? value_unlink
                        : this.state.active === "File Error Logs"
                        ? value_error
                        : this.state.active === "File Ready Logs"
                        ? value_ready
                        : null}
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <h1>File Monitoring System</h1>
              <br />
              <br />

              <h2>Directory Tracking</h2>
              <div className="text-center" style={{ display: "inline-block" }}>
                <ButtonToolbar style={{ display: "inline-block" }}>
                  <button
                    className="myButton"
                    variant="directory_added"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => this.setState({ active: "Directory Added" })}
                  >
                    Directory Added
                  </button>
                  <button
                    className="myButton"
                    variant="directory_removed"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() =>
                      this.setState({ active: "Directory Removed" })
                    }
                  >
                    Directory Removed
                  </button>
                </ButtonToolbar>
                <br />
                <h2>File Tracking</h2>
                <ButtonToolbar>
                  <button
                    className="myButton"
                    variant="file_added"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => this.setState({ active: "File Added" })}
                  >
                    File Added
                  </button>
                  <button
                    className="myButton"
                    variant="file_changed"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => this.setState({ active: "File Changed" })}
                  >
                    File Changed
                  </button>
                  <button
                    className="myButton"
                    variant="file_removed"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => this.setState({ active: "File Removed" })}
                  >
                    File Removed
                  </button>
                </ButtonToolbar>
                <br />
                <h2>File Logs Tracking</h2>
                <ButtonToolbar style={{ display: "inline-block" }}>
                  <button
                    className="myButton"
                    variant="file_error_logs"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => this.setState({ active: "File Error Logs" })}
                  >
                    File Error Logs
                  </button>
                  <button
                    className="myButton"
                    variant="file_ready_logs"
                    data-toggle="modal"
                    data-target="#exampleModalCenter"
                    onClick={() => this.setState({ active: "File Ready Logs" })}
                  >
                    File Ready Logs
                  </button>
                </ButtonToolbar>
              </div>
            </div>
          </Tab>
          <Tab eventKey="dradded" title="Directory Added">
            <Form
              id="form1"
              ref={form => (this.form1 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e), this.setState({ active: "Directory Added" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "Directory Added" }),
                  this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="drremoved" title="Directory Removed">
            <Form
              id="form2"
              ref={form => (this.form2 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e),
                this.setState({ active: "Directory Removed" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "Directory Removed" }),
                  this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="fladded" title="File Added">
            <Form
              id="form3"
              ref={form => (this.form3 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e), this.setState({ active: "File Added" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "File Added" }), this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="flremoved" title="File Removed">
            <Form
              id="form4"
              ref={form => (this.form4 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e), this.setState({ active: "File Removed" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "File Removed" }), this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="flchanged" title="File Changed">
            <Form
              id="form5"
              ref={form => (this.form5 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e), this.setState({ active: "File Changed" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "File Changed" }), this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="ferrlogs" title="File Error Logs">
            <Form
              id="form6"
              ref={form => (this.form6 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e), this.setState({ active: "File Error Logs" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "File Error Logs" }),
                  this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="freadylogs" title="File Ready Logs">
            <Form
              id="form7"
              ref={form => (this.form7 = form)}
              className="col-sm-6 offset-sm-3"
              onSubmit={e => (
                this.handleShow(e), this.setState({ active: "File Ready Logs" })
              )}
            >
              <Form.Group controlId="dateinput">
                <Form.Label style={{ color: "white" }}>Sort by Date</Form.Label>
                <Form.Control
                  type="date"
                  onChange={e => this.sort(e.target.value, "date")}
                />
              </Form.Group>
              <Form.Group controlId="ipinput">
                <Form.Label style={{ color: "white" }}>Sort by IP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="XXX:XXX:XXX:XXX"
                  onChange={e => this.sort(e.target.value, "ip")}
                />
              </Form.Group>
              <Form.Group controlId="filenameinput">
                <Form.Label style={{ color: "white" }}>
                  Sort by File Name
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="File Name"
                  onChange={e => this.sort(e.target.value, "name")}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Search
              </Button>
              <Button
                variant="danger"
                onClick={e => (
                  this.setState({ active: "File Ready Logs" }),
                  this.handleShow(e)
                )}
              >
                Get all
              </Button>
            </Form>
          </Tab>
        </Tabs>

        {/* modal */}
        <Modal
          dialogClassName="modal-90w"
          centered
          show={this.state.show}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>{this.state.active + " Details"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.active === "Directory Added" ? (
              value_addDir[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_addDir
              )
            ) : this.state.active === "Directory Removed" ? (
              value_unlinkDir[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_unlinkDir
              )
            ) : this.state.active === "File Added" ? (
              value_add[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_add
              )
            ) : this.state.active === "File Changed" ? (
              value_change[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_change
              )
            ) : this.state.active === "File Removed" ? (
              value_unlink[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_unlink
              )
            ) : this.state.active === "File Error Logs" ? (
              value_error[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_error
              )
            ) : this.state.active === "File Ready Logs" ? (
              value_ready[0] === undefined ? (
                <h6>No Data!</h6>
              ) : (
                value_ready
              )
            ) : null}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default FileTracking;
