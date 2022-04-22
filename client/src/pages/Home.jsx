import React, { useEffect } from "react";
import { Link as Scroll } from "react-scroll";
import { connect } from "react-redux";

import { IconButton } from "@mui/material";
import { CssBaseline } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import HomeCards from "../components/HomeCards.jsx";
import * as actions from '../actions/actions.js';

const axios = require("axios");

export default function Home(props) {

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
            Welcome to <br />{" "}
            <span className="homeTitleText">Tenancy</span>
          </h1>
          <Scroll to="homeCards" smooth={true}>
            <IconButton>
              <KeyboardArrowDownIcon
                className="homeTitleIcon"
                style={{ fontSize: 40 }}
              />
            </IconButton>
          </Scroll>
        </div>
      </div>
      
    </div>
  );
}