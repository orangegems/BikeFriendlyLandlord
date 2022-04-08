import React, { useState } from "react";
import axios from 'axios';

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Rating from "@mui/material/Rating";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Icon from "@mui/material/Icon";

export function Review(props) {
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);

  const handleSave = () => {
      axios.put('/reviews/', {reviewId: props._id, title: title, description: description})
      .then(res => window.location.reload())
      .catch(error => console.log(error));
  }

  const handleDelete = () => {
    axios.delete(`/reviews/${props._id}`)
    .then(() => window.location.reload())
    .catch(error => console.log(error));
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent direction="row">
        {updateMode ? (
          <input
            type="text"
            defaultValue={props.title}
            onChange={(event) => setTitle(event.target.value)}
          />
        ) : (
          <>
            <div
              className="userDisplayAndActions"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div className="userDisplay">
                <Typography sx={{ color: "#666" }} variant="subtitle1">
                  Posted by: {props.username}
                </Typography>
              </div>
              <div
                className="userActions"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <Icon>
                  <EditIcon
                    style={{
                      color: "teal",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={() => setUpdateMode(true)}
                  ></EditIcon>
                </Icon>
                <Icon>
                  <DeleteIcon
                    style={{
                      color: "tomato",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={handleDelete}
                  ></DeleteIcon>
                </Icon>
              </div>
            </div>
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Typography className="Title" variant="h5">
                {props.title}
              </Typography>
            </Stack>
          </>
        )}
        <Stack spacing={5} direction="row">
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Overall Rating</Typography>
            <Rating
              style={{ color: "tomato" }}
              name="read-only"
              required
              size="small"
              precision={0.5}
              value={Number(props.overall_rating)}
              readOnly
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Respectful</Typography>
            <Rating
              style={{ color: "tomato" }}
              name="read-only"
              required
              size="small"
              precision={0.5}
              value={Number(props.respect_rating)}
              readOnly
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Responsiveness</Typography>
            <Rating
              style={{ color: "tomato" }}
              name="read-only"
              required
              size="small"
              precision={0.5}
              value={Number(props.responsiveness_rating)}
              readOnly
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Bike</Typography>
            <Icon>
              {props.bike_friendly ? (
                <CheckIcon
                  style={{ color: "limeGreen", fontSize: "20px" }}
                ></CheckIcon>
              ) : (
                <ClearIcon style={{ color: "tomato", fontSize: "20px" }} />
              )}
            </Icon>
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Pet Friendly</Typography>
            <Icon>
              {props.pet_friendly ? (
                <CheckIcon
                  style={{ color: "limeGreen", fontSize: "20px" }}
                ></CheckIcon>
              ) : (
                <ClearIcon style={{ color: "tomato", fontSize: "20px" }} />
              )}
            </Icon>
          </Stack>
        </Stack>
        {updateMode ? (
          <>
            <textarea
              type="text"
              defaultValue={props.description}
              style={{ width: "100%" }}
              onChange={(event) => setDescription(event.target.value)}
            />
            <button
              style={{
                padding: "7px 15px",
                borderRadius: "10px",
                border: "1px solid tomato",
                color: "tomato",
                backgroundColor: "white",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => setUpdateMode(false)}
            >
              Cancel
            </button>
            <button
              style={{
                padding: "7px 15px",
                borderRadius: "10px",
                border: "none",
                color: "white",
                backgroundColor: "tomato",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              Save
            </button>
          </>
        ) : (
          <Typography className="Description" variant="h7">
            {props.description}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
