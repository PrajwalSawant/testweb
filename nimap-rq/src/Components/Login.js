import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";
import { login } from "../Reducers/userSlice";
import { useDispatch } from "react-redux";
import cogoToast from "cogo-toast";

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Err, setErr] = useState("");

  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("loginInfo"));

  const signin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      return cogoToast.error("enter every field");
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return cogoToast.error("invalid email");
    } else if (password.length < 6) {
      cogoToast.error("enter more then 6 chars");
    } else if (!currentUser) {
      return cogoToast.error("no user");
    } else if (
      currentUser.email === email &&
      currentUser.password === password
    ) {
      try {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({ ...currentUser, isLoggedIn: true })
        );
        cogoToast.success("Logged in successfully");
        const name = currentUser.name;
        dispatch(
          login({
            name: name,
            email: email,
            password: password,
          })
        );
        history.push("/home");
      } catch (err) {
        setErr(err.message);
        console.log(Err);
      }
    } else {
      cogoToast.error("invalid pass or email");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="logiWwrapper" style={{ textAlign: "center" }}>
      <h1
        style={{
          fontSize: "8rem",
          color: "#ccc",
          margin: "2rem auto 1rem auto",
        }}
      >
        LOGO
      </h1>
      <form className="loginContent">
        <h1
          style={{ fontSize: "2.5rem", textAlign: "center", fontWeight: "400" }}
        >
          LOGIN
        </h1>
        <div className="loginInfo">
          <h3>Email : *</h3>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="loginInfo">
          <h3>Password : *</h3>
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="loginBtn">
          <input type="submit" value="Login" onClick={signin} />
          <Link to="/signup">
            <button>Signup</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
