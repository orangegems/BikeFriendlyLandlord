import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Review } from "../components/Review.jsx";
import { LandlordInfoCard } from "../components/LandlordInfoCard.jsx";
import AddressCard from "../components/AddressCard.jsx"

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Stack } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";

import tomatopalette from "../theme/tomatopalette.jsx";

export default function ProfilePage({ userData, isLoggedIn, isLandlord }) {
  const navigate = useNavigate();
  const [landlordData, setLandlordData] = React.useState(null);
  const [reviewData, setReviewData] = React.useState(null);

  const { landlordId } = useParams();

  useEffect(() => {
    // if the url contains the landlord id
    // or the user is logged in and is a

    console.log(landlordId);
    // landlord role (state will contain ID)
    if (landlordId || isLandlord) {
      // fetches grab from the url ID (if truthy) or from the userData's landlord ID

      // fetches landlord data to populate profile
      fetch(`/landlords/getById/${landlordId || userData.landlord_id}`)
        .then((landlord) => setLandlordData(landlord.data))
        .catch((err) => console.log("Error fetching landlord data -->", err));

      // fetches reviews submitted about the landlord user
      fetch(`/reviews/landlordReviews/${landlordId || userData.landlord_id}`)
        .then((reviews) => setReviewData(reviews.data))
        .catch((err) =>
          console.log("Error fetching landlord reviews -->", err)
        );

      // otherwise, if tenant is logged in and routes
      //  to /profile [with no ID endpoint]
    } else if (isLoggedIn) {
      // fetches reviews submitted by the tenant about other landlord users
      fetch(`/reviews/${userData._id}`)
        .then((res) => res.json())
        .then((json) => setReviewData(json.reviews))
        .catch((err) => console.log("Error fetching user reviews -->", err));
    }
  }, []);

  //onclick for button
  const handleReview = () =>
    navigate(`/review/${landlordId || userData.landlord_id}/`);

  return (
    <ThemeProvider theme={tomatopalette}>
      <div id="background">
        <Container className="MainContainer">
          <AddressCard/>
          {
            // if not logged in and no ID specified in url
            !landlordId && !isLoggedIn && (
              <div>Please login to view your profile</div>
            )
          }

          {
            // if landlord data is falsy on render
            // while URL specifies ID or landlord is logged in
            !landlordData && (landlordId || isLandlord) && (
              <>Error 500: Database Error or Invalid Landlord ID</>
            )
          }

          {
            // if landlord data loads
            // & URL id is specified or user is a landlord
            landlordData && (landlordId || isLandlord) ? (
              <Stack
                className="LandlordInfo"
                sx={{ pb: 5, pl: 5 }}
                direction="row"
                justifyContent="space-around"
              >
                <Stack>
                  <Card sx={{ minWidth: 275 }}>
                    <CardContent>
                      <div className="ProfilePicture">
                        <img
                          style={{ height: "100px" }}
                          src={`/images/${landlordData.profile_pic}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                      <nav aria-label="main mailbox folders">
                        <List>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <EmailIcon />
                              </ListItemIcon>
                              <ListItemText primary="Email" />
                              <ListItemText />
                            </ListItemButton>
                          </ListItem>
                          <ListItem disablePadding>
                            <ListItemButton>
                              <ListItemIcon>
                                <LocalPhoneIcon />
                              </ListItemIcon>
                              <ListItemText primary="Phone Number" />
                            </ListItemButton>
                          </ListItem>
                        </List>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <ApartmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Office Location" />
                          </ListItemButton>
                        </ListItem>
                      </nav>
                    </Box>
                  </Card>
                </Stack>
                <Stack>
                  <LandlordInfoCard {...landlordData} />
                </Stack>
              </Stack>
            ) : (
              // if logged in user is a tenant
              // & no ID in url
              isLandlord === false &&
              !landlordId && (
                <>
                  <h1 id="userProfileTitle">Your Account</h1>
                  <h3>
                    Hello {userData.full_name}
                    {","}
                  </h3>
                </>
              )
            )
          }

          {
            // if tenant is logged in & review data loads
            // or if landlord ID is in url and landlord & review data load
            // or if landlord is logged in and landlord & review data load

            (isLoggedIn || ((landlordId || isLandlord) && landlordData)) &&
              reviewData && (
                <>
                  <Container>
                    <Stack spacing={2} direction="row">
                      <Typography variant="h3" gutterBottom component="div">
                        Reviews
                      </Typography>
                      {
                      // user can only add review if
                      // they're logged in as a tenant
                      // and on a landlord's page
                      !isLandlord && landlordId && (
                        <Stack
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 1,
                            m: 1,
                          }}
                        >
                          <Button variant="contained" onClick={handleReview}>
                            Create Review
                          </Button>
                        </Stack>
                      )}
                    </Stack>
                  </Container>

                  <Container>
                    <Stack>
                      <div>
                        {reviewData.map((eachReview, i) => (
                          <Review key={i} {...eachReview} userData={userData} />
                        ))}
                      </div>
                    </Stack>
                  </Container>
                </>
              )
          }

          {
            // if review data fails to load when user is logged in
            // or URL specifies correct landlordId
            !reviewData && landlordData && (isLoggedIn || landlordId) && (
              <div>Error 500: Loading reviews failed.</div>
            )
          }
        </Container>
      </div>
    </ThemeProvider>
  );
}
