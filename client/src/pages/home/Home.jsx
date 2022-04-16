import "./home.css";
import HomeCards from "../../components/homeCards/HomeCards.jsx";
import React, { useEffect, useState } from "react";
import { Collapse, IconButton, makeStyles } from "@mui/material";
import { CssBaseline } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as Scroll } from "react-scroll";
import { connect } from "react-redux";
import * as actions from '../../actions/actions.js';

const axios = require("axios");

const mapDispatchToProps = (dispatch) => ({
  setTopFour: (topFour) => dispatch(actions.populateTopFour(topFour))
})

function Home(props) {
  
  useEffect(() => {
    axios
      .get("http://localhost:3000/landlords/topFour")
      .then((res) => props.setTopFour(res.data))
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
            Welcome to <br />{" "}
            <span className="homeTitleText">Bike Friendly Landlord</span>
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
      <HomeCards />
      
    </div>
  );
}


export default connect(null, mapDispatchToProps)(Home);