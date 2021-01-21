import React, { Component } from "react";
import "../styles/header.css";
import Modal from "react-modal";
import axios from "axios";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%,-50%)",
    backgroundColor:'#2f4f4f', 
    fontfamily: 'Arial',
    //border: "solid 2px gray",
    color:"white"
  } 
};
class Header extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isSigninModalOpen: false,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      isLoggedIn: false,
    };
  }
  changeHandler = (event, stateVariable) => {
    this.setState({
      [stateVariable]: event.target.value,
    });
  };
  cancelHandler = (event) => {
    this.setState({
      isModalOpen: false,
    });
  };
  signupOpenHandler = (event) => {
    this.setState({
      isModalOpen: true,
    });
  };
  signupHandler = (event) => {
    const { email, firstname, lastname, password } = this.state;
    const signUpRequestObject = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      password: password,
    };
    axios({
      method: "POST",
      url: "http://localhost:1998/signup",
      headers: { "Content-Type": "application/json" },
      data: signUpRequestObject,
    })
      .then((result) => {
        if (
          result.data.message == "user signed up data has fetched successfully"
        ) {
          this.setState({
            isModalOpen: false,
            email: "",
            firstname: "",
            lastname: "",
            password: "",
          });
          alert(result.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  loginOpenHandler = (event) => {
    this.setState({
      isSigninModalOpen: true,
    });
  };
  loginHandler = (event) => {
    const { email, password } = this.state;
    const loginRequestObject = {
      email: email,
      password: password,
    };
    console.log(loginRequestObject)
    axios({
      method: "POST",
      url: "http://localhost:1998/login",
      headers: { "Content-Type": "application/json" },
      data: loginRequestObject,
    })
      .then((result) => {
        if (result.data.Data.length >= 1) {
          this.setState({
            isSigninModalOpen: false,
            email: "",
            password: "",
            isLoggedIn: result.data.isAuthenticated,
            firstname: result.data.Data[0].firstname,
          });
          sessionStorage.setItem("isLoggedIn", result.data.isAuthenticated);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  };
  cancelLoginHandler = (event) => {
    this.setState({
      isSigninModalOpen: false,
    });
  };
  logoutHandler = (event) => {
    this.setState({
      firstname: "",
      isLoggedIn: false,
    });
    sessionStorage.setItem("isLoggedIn", false);
  };
  render() {
    const {
      isModalOpen,
      isSigninModalOpen,
      isLoggedIn,
      email,
      firstname,
      lastname,
      password,
    } = this.state;
    return (
      <React.Fragment>
        <div className="header_content_size">
          <div className="logo_f">e!</div>
          <div className="buttons_f">
            {isLoggedIn ? (
              <div>
                <span class="text-white">{firstname}</span>
                <button
                  class="btn btn-sm btn-primary ml-3 border-white"
                  onClick={this.logoutHandler}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  class="btn btn-sm text-white"
                  onClick={this.loginOpenHandler}
                >
                  Login
                </button>
                <button
                  className="btn btn-sm text-white ml-3 border-white"
                  onClick={this.signupOpenHandler}
                >
                  Signup
                </button>
              </div>
            )}
          </div>
          <Modal isOpen={isModalOpen} style={customStyles}>
            <div>
              <h3>SignUp user</h3>
              <div>
                <span><h6>Email:</h6></span>
               <div> <input
                  type="text"
                  value={email}
                  onChange={(event) => this.changeHandler(event, "email")}
                  placeholder="please enter valid email"
                ></input></div>
                <br />
                <span><h6>First Name:</h6> </span>
               <div> <input
                  type="text"
                  value={firstname}
                  onChange={(event) => this.changeHandler(event, "firstname")}
                  placeholder="please enter firstname"
                ></input></div>
                <br />
                <span><h6>Last Name:</h6> </span>
                <div><input
                  type="text"
                  value={lastname}
                  onChange={(event) => this.changeHandler(event, "lastname")}
                  placeholder="please enter lastname"
                ></input></div>
                <br />
                <span>Password: </span>
                <div><input
                  type="password"
                  value={password}
                  onChange={(event) => this.changeHandler(event, "password")}
                ></input></div>
                <br />
                <button
                  class="btn btn-sm btn-primary"
                  onClick={this.signupHandler}
                >
                  Signup
                </button>
                <button
                  class="btn btn-sm btn-primary ml-3"
                  onClick={this.cancelHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
          <Modal isOpen={isSigninModalOpen} style={customStyles}>
            <div>
              <h3>Login</h3>
              <div>
                <span><h6>Email:</h6></span>
                <div> <input
                  type="text"
                  value={email}
                  name="Uname"
                  id="Uname"
                  onChange={(event) => this.changeHandler(event, "email")}
                  placeholder="please enter email"
                ></input></div>
                <br />
                <span><h6>Password:</h6> </span>
                <div> <input
                  type="password"
                  value={password}
                  name="Pass"
                  id="Pass"
                  onChange={(event) => this.changeHandler(event, "password")}
                ></input></div>
                <br />
                <button
                  class="btn btn-sm btn-primary"
                  onClick={this.loginHandler}
                  name="log"
                  id="log"
                >
                  Login
                </button>
                <button
                  class="btn btn-sm btn-primary ml-3"
                  onClick={this.cancelLoginHandler}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
export default Header;
