import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../Reducers/userSlice";
import { login, logout } from "../Reducers/userSlice";
import "./changepwd.css";
import cogoToast from "cogo-toast";

function Changepwd() {
  const [chpassword, setChpassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const currentUser = JSON.parse(localStorage.getItem("loginInfo"));

  const resetpass = () => {
    if (chpassword.length > 6) {
      try {
        localStorage.setItem(
          "loginInfo",
          JSON.stringify({ ...currentUser, password: chpassword })
        );
        dispatch(
          login({
            ...user,
            password: chpassword,
          })
        );
        cogoToast.success("changed successfully");
        history.push("/userpage");
      } catch (err) {
        console.log(err.message);
      }
    } else {
      cogoToast.error("enter more than 6 chars");
      setChpassword("");
    }
  };

  const signout = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="wrapper2">
      <div className="content2">
        <h1
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            borderBottom: ".1rem solid #333",
            margin: "1rem 12rem",
            fontWeight: "600",
          }}
        >
          Reset Password
        </h1>
        <div className="info1">
          <h1>username : </h1>
          <h2>{user && user.name}</h2>
        </div>
        <div className="info1">
          <h1>password : </h1>
          <input
            required
            placeholder="Password"
            type="password"
            minLength={8}
            value={chpassword}
            onChange={(e) => setChpassword(e.target.value)}
          />
        </div>
        <div className="btn" style={{ marginTop: "3.8rem" }}>
          <button className="btn1" onClick={resetpass}>
            save password
          </button>
          <button className="btn1" onClick={signout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Changepwd;
