import "./home.css";
import HomeCards from "../../components/homeCards/HomeCards.jsx";
import React, { useEffect, useState } from "react";
import { Collapse, IconButton, makeStyles } from "@mui/material";
import { CssBaseline } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function Home() {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <div className="home">
      <div className="homeBanner">
        <CssBaseline />
        <div className="homeTitle" data-aos="fade-up" data-aos-duration="1000">
          <h1>
            Welcome to <br />{" "}
            <span className="homeTitleText">Bike Friendly Landlord</span>
          </h1>
          <IconButton>
            <KeyboardArrowDownIcon
              className="homeTitleIcon"
              style={{ fontSize: 40 }}
            />
          </IconButton>
        </div>
      </div>
      <HomeCards />
    </div>
  );
}
