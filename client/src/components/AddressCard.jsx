import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";

import KingBedOutlinedIcon from "@material-ui/icons/KingBedOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";

export default function AddressCard() {
  const [homeInfo, setHomeInfo] = useState({});
  const [reviewInfo, setReviewInfo] = useState({});
  const [criteria, setCriteria] = useState({});

  useEffect(() => {
    setHomeInfo({
      addressId: 12345,
      landlordName: "David Palmer",
      streetNum: "4664",
      street: "Alameda Blvd",
      apartmentNum: "2b",
      city: "Los Angeles",
      state: "CA",
      zip: "92118",
      buildingType: "Apartment",
      beds: "2",
      baths: "1",
      price: "$2400",
    });

    setReviewInfo({
      overall: "4.5",
      respectfulness: "2",
      responsiveness: "5",
      tlc: "4.5",
      personalization: "3",
      latePayment: "fees included",
    });

    setCriteria({
      dogSizeMax: "20lbs",
      breedRestriction: true,
      dogsAllowed: true,
      petsAllowed: true,
      bikesAllowed: false,
      overnightGuests: true,
      quietHours: "10pm-8am",
      smoking: false,
    });
  }, []);

  return (
    <Card sx={{ maxWidth: 370 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "20px" }}>
          {`${homeInfo.streetNum} ${homeInfo.street} #${homeInfo.apartmentNum}`}
        </div>
        <Typography sx={{ fontSize: "10px" }}>
          {homeInfo.buildingType}
        </Typography>
      </div>
      <div id="addressPic">
        <CardMedia
          image="/images/address_1.jpg"
          alt="home"
          height="200"
          component="img"
          sx={{ border: "1px solid grey", zIndex: 0 }}
        />

        <Box
          id="addressInfo"
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            right: 0,
            bottom: 0,
          }}
        >
          <KingBedOutlinedIcon /> 2 <BathtubOutlinedIcon /> 1
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography>
            {homeInfo.city}, {homeInfo.state} {homeInfo.zip}
          </Typography>
        </Box>

        <Box
            id="reviewInfo"
            sx={{
              display: "flex",
              flexDirection: "column",
              boxShadow: 1,
            }}
          >
            <Typography variant="h7">Respectfulness</Typography>
            <Rating
              precision={0.5}
              value={Number(reviewInfo.respectfulness)}
              readOnly
            />
            <Typography variant="h7">Responsiveness</Typography>
            <Rating
              precision={0.5}
              value={Number(reviewInfo.responsiveness)}
              readOnly
            />
            <Typography variant="h7">Respectfulness</Typography>
            <Rating
              precision={0.5}
              value={Number(reviewInfo.respectfulness)}
              readOnly
            />
          </Box>
      </div>

      {/* //picture div
            // picture
            // link overlay
            // sqft & info overlay
        
        // address div
            //building type
            // price
            // criteria (on other column)
        
        // review div
            // landlord name /w overall stars
            // respect
            // response
            // TLC
            // flexibility
         */}
    </Card>
  );
}
