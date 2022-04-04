import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import "./homeCard.css";
import Icon from '@mui/material/Icon';
import CheckIcon from '@mui/icons-material/Check';


export default function HomeCard() {
  return (
      <Card
        sx={{ width: 245, background: "rgba(0, 0, 0, 0.5)", margin: "20px" }}
      >
        <CardMedia
          component="img"
          alt="landlord pic"
          height="200"
          image="https://images.unsplash.com/photo-1499887142886-791eca5918cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
        />
        <CardContent>
          <div className="homeCardContents">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ fontFamily: "Nunito" }}
              color="#fff"
            >
              Landy McLandlord
            </Typography>
            <Typography
              variant="body2"
              className="homeCardTitle"
              style={{ fontFamily: "Nunito" }}
              color="#ddd"
            >
              Location: Los Angeles
              <br />
              <div className="homeCardRating">
                <span style={{ color: "#ddd" }}>Rating:</span>
                <Rating
                  required
                  size="small"
                  precision={0.1}
                  value={4.4}
                  readOnly
                  style={{color: "tomato"}}
                />
              </div>
              <div className="bikePetFriendlyRating">
                  <label>Bike Friendly</label>
                  <Icon>
                      <CheckIcon style={{color: "tomato", fontSize: "20px"}}></CheckIcon>
                  </Icon>
              </div>
              <div className="bikePetFriendlyRating">
                  <label>Pet Friendly</label>
                  <Icon>
                      <CheckIcon style={{color: "tomato", fontSize: "20px"}}></CheckIcon>
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
  );
}
