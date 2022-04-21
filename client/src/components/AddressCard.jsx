import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import LinkIcon from "@mui/icons-material/Link";

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
      street: "Alameda Blvd.",
      apartmentNum: "2b",
      city: "Los Angeles",
      state: "CA",
      zip: "92118",
      buildingType: "Apartment",
      beds: "2",
      baths: "1",
      price: "2400",
      link: "http://zillow.com",
    });

    setReviewInfo({
      overall: "4.5",
      respectfulness: "2",
      responsiveness: "5",
      tlc: "4.5",
      personalization: "3",
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
      latePayment: "fees included",
    });
  }, []);

  return (
    <Card
      sx={{ maxWidth: 390, backgroundColor: "#002147", color: "#ededed" }}
      id="addressCard"
    >
      {/* title container */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "15px 15px 5px 15px",
          letterSpacing: "2px",
        }}
      >
        <div style={{ fontSize: "20px" }}>
          {`${homeInfo.streetNum} ${homeInfo.street} #${homeInfo.apartmentNum}`}
        </div>
        <Typography
          sx={{ fontSize: "10px", letterSpacing: "5px", color: "#bababa" }}
        >
          {homeInfo.buildingType}
        </Typography>
      </div>

      {/* picture */}
      <div id="addressPic">
        <CardMedia
          image="/images/address_1.jpg"
          alt="home"
          height="200"
          component="img"
          sx={{ zIndex: 0 }}
        />

        {/* price box */}
        <Box
          id="price"
          sx={{
            position: "absolute",
            flexDirection: "column",
            zIndex: 1,
            backgroundColor: "#002147",
            opacity: 0.6,
            dropShadow: "20px 20px 20px black",
            borderRadius: "0px 0px 5px 0px",
            padding: "5px",
          }}
        >
          ${homeInfo.price}
        </Box>

        {/* beds and baths box */}
        <Box
          id="bedsBaths"
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
            right: 0,
            top: 0,
            backgroundColor: "#002147",
            opacity: 0.6,
            borderRadius: "0px 0px 0px 5px",
            padding: "0px 0px 5px 5px",
            width: "70px",
          }}
        >
          <div
            style={{
              color: "#ededed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KingBedOutlinedIcon />
            {homeInfo.beds}
            <BathtubOutlinedIcon />
            {homeInfo.baths}
          </div>
        </Box>

        {/* link box */}
        <a
          href={homeInfo.link}
          target="new"
          style={{ bottom: 0, position: "absolute" }}
        >
          <Box
            id="price"
            onClick={() => {}}
            sx={{
              position: "absolute",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1,
              bottom: 0,
              backgroundColor: "#002147",
              opacity: 0.6,
              dropShadow: "20px 20px 20px black",
              borderRadius: "0px 5px 0px 0px",
              padding: "5px 5px 0px 5px",
            }}
          >
            <LinkIcon />
          </Box>
        </a>

        {/* overall review box */}
        <Box
          id="overallReview"
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
            right: 0,
            bottom: 0,
            backgroundColor: "#002147",
            opacity: 0.6,
            borderRadius: "5px 0px 0px 0px",
            padding: "5px 5px 5px 5px",
          }}
        >
          <div
            style={{ color: "#262626", display: "flex", alignItems: "center" }}
          >
            <Rating
              precision={0.5}
              value={Number(reviewInfo.overall)}
              sx={{ opacity: 1, fontSize: "20px" }}
              readOnly
              emptyIcon={
                <StarIcon
                  style={{ opacity: 0.1, color: "white" }}
                  fontSize="inherit"
                />
              }
            />
          </div>
        </Box>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: "15px",
        }}
      >

        {/* extra info */}
        <Box sx={{ marginLeft: "-20px" }}>
          <Typography>
            {homeInfo.city}, {homeInfo.state} {homeInfo.zip}
          </Typography>
        </Box>

        {/* review breakdown */}
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
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.1, color: "white" }}
                fontSize="inherit"
              />
            }
          />
          <Typography variant="h7">Responsiveness</Typography>
          <Rating
            precision={0.5}
            value={Number(reviewInfo.responsiveness)}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.1, color: "white" }}
                fontSize="inherit"
              />
            }
          />
          <Typography variant="h7">TLC</Typography>
          <Rating
            precision={0.5}
            value={Number(reviewInfo.tlc)}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.1, color: "white" }}
                fontSize="inherit"
              />
            }
          />
          <Typography variant="h7">Personalization</Typography>
          <Rating
            precision={0.5}
            value={Number(reviewInfo.personalization)}
            readOnly
            emptyIcon={
              <StarIcon
                style={{ opacity: 0.1, color: "white" }}
                fontSize="inherit"
              />
            }
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
