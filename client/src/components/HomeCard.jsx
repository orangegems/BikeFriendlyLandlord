import * as React from "react";
import { Link } from 'react-router-dom'; 

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Icon from "@mui/material/Icon";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

export default function HomeCard({ landlord }) {
  // console.log("landlord", landlord);
  return (
    <Link to={`/profile/${landlord._id}`} className="link">
      <Card sx={{ width: 245, background: "rgba(0, 0, 0, 0.5)", margin: "20px", cursor: "pointer"}}>
        <CardMedia
          component="img"
          alt="landlord pic"
          height="200"
          image={`http://localhost:3000/images/userProfile.png`}
        />
        <CardContent>
          <div className="homeCardContents">
            <Typography
              gutterBottom
              variant="h5"
              component="span"
              style={{ fontFamily: "Nunito" }}
              color="#fff"
            >
              {landlord.full_name}
            </Typography>
            <Typography
              variant="span"
              className="homeCardTitle"
              style={{ fontFamily: "Nunito" }}
              color="#ddd"
            >
              Location:{" "}
              {landlord.city ? landlord.city + ", " + landlord.state : "N/A"}
              <br />
              <div className="homeCardRating">
                <span style={{ color: "#ddd" }}>Rating:</span>
                <Rating
                  required
                  size="small"
                  precision={0.1}
                  value={Number(landlord.overall_rating)}
                  readOnly
                  style={{ color: "white" }}
                />
              </div>
              <div className="bikePetFriendlyRating">
                <label>Bike Friendly</label>
                <Icon>
                  {landlord.bike_friendly ? (
                    <CheckIcon
                      style={{ color: "limeGreen", fontSize: "20px" }}
                    ></CheckIcon>
                  ) : (
                    <ClearIcon style={{ color: "white", fontSize: "20px" }} />
                  )}
                </Icon>
              </div>
              <div className="bikePetFriendlyRating">
                <label>Pet Friendly</label>
                <Icon>
                  {landlord.pet_friendly ? (
                    <CheckIcon
                      style={{ color: "limeGreen", fontSize: "20px" }}
                    ></CheckIcon>
                  ) : (
                    <ClearIcon style={{ color: "white", fontSize: "20px" }} />
                  )}
                </Icon>
              </div>
            </Typography>
          </div>
        </CardContent>
        {/* <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </Link>
  );
}
