import React, { useState, useEffect } from "react";
import "./Home.css";

function Home() {
  const [checked, setChecked] = useState("");

  return (
    <div className="wrapper">
      <div className="data">
        <select
          name="Dropdown"
          id=""
          onChange={(e) => setChecked(e.target.value)}
        >
          <option value="" selected>
            Select
          </option>
          <option value="val1">Dropdown</option>
          <option value="val2">Dropdown2</option>
        </select>
        <p>
          {checked === ""
            ? "Please select a Value"
            : checked === "val1"
            ? "Dropdown 1 selected"
            : checked === "val2"
            ? "Dropdown 2 selected"
            : ""}
        </p>
      </div>
    </div>
  );
}

export default Home;
