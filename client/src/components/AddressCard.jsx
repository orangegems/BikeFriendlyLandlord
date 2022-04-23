import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import StarIcon from "@material-ui/icons/Star";
import LinkIcon from "@mui/icons-material/Link";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import KingBedOutlinedIcon from "@material-ui/icons/KingBedOutlined";
import BathtubOutlinedIcon from "@material-ui/icons/BathtubOutlined";

export default function AddressCard({ address, isAddCard }) {
  const [addPressed, setAddPressed] = useState(false);
  const [addressForm, setAddressForm] = useState({});

  const {
    address_id,
    street_num,
    street,
    apt_num,
    city,
    state,
    zip,
    bike_friendly,
    pet_friendly,
    dog_friendly,
    dog_breed_restriction,
    dog_size_max_lbs,
    overall_rating,
    tlc,
    personalization,
    quiet_hours,
    overnight_guests,
    smoker_friendly,
    building_type,
    beds,
    baths,
    price,
    late_payments,
    listing_link,
  } = address || {};

  const postAddress = async () => {
    await fetch(`/address/`, {
      method: "POST",
      body: JSON.stringify(addressForm),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("error submitting address ->" + err);
      });
  };

  return (
    <>
      {isAddCard &&
        (addPressed ? (
          <div>boop</div>
        ) : (
          <Card
            sx={{
              maxWidth: 600,
              minWidth: 400,
              maxHeight: 800,
              backgroundColor: "#002147",
              color: "#ededed",
              height: 200,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="addressCard"
          >
            <AddCircleIcon sx={{ fontSize: "40px" }}></AddCircleIcon>
          </Card>
        ))}
      {
        // if it's a regular address card !isAddCard && (
        <Card
          sx={{
            maxWidth: 390,
            maxHeight: 800,
            backgroundColor: "#002147",
            color: "#ededed",
          }}
          id="addressCard"
        >
          <>
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
                {`${street_num} ${street} ${apt_num ? "#" : ""}${
                  apt_num || ""
                }`}
              </div>
              <Typography
                sx={{
                  fontSize: "10px",
                  letterSpacing: "5px",
                  color: "#bababa",
                }}
              >
                {building_type}
              </Typography>
            </div>

            {/* picture */}
            <div id="addressPic">
              <CardMedia
                image={`/images/address_${1 || address_id}.jpg`}
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
                ${price}
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
                  {beds}
                  <BathtubOutlinedIcon />
                  {baths}
                </div>
              </Box>

              {/* link box */}
              <a
                href={listing_link}
                target="new"
                style={{ bottom: 0, position: "absolute" }}
              >
                <Box
                  id="link"
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
                  style={{
                    color: "#262626",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    precision={0.5}
                    value={Number(overall_rating)}
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
                  {city}, {state} {zip}
                </Typography>

                {/* popup modal for extra criteria */}
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
                <Typography variant="h7">TLC</Typography>
                <Rating
                  precision={0.5}
                  value={Number(tlc)}
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
                  value={Number(personalization)}
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
          </>
        </Card>
      }
    </>
  );
}
