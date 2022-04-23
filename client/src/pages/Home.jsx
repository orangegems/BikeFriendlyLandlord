import React, { useEffect, useState } from "react";
import { Link as Scroll } from "react-scroll";

import { IconButton } from "@mui/material";
import { CssBaseline } from "@mui/material";

import HomeCards from "../components/HomeCards.jsx";
import * as actions from "../actions/actions.js";

const axios = require("axios");

export default function Home(props) {
  const [checked, setChecked] = useState(false);
  const [topFour, setTopFour] = useState([]);
  useEffect(() => {
    setChecked(true);

    axios
      .get("http://localhost:3000/landlords/topFour")
      .then((res) => setTopFour(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="home">
      <div className="homeBanner">
        <CssBaseline />
        <div
          className="homeTitle"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-mirror={true}
        >
          <h1>
            Welcome to <br /> <span className="homeTitleText">tenancy.</span>
          </h1>
          <Scroll to="homeCards" smooth={true}> 
          </Scroll>
        </div>
      </div>
      {/* <HomeCards topFour={topFour} /> */}
    </div>
  );
}
