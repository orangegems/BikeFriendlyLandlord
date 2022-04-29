import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Review } from "../components/Review.jsx";
import { LandlordInfoCard } from "../components/LandlordInfoCard.jsx";
import AddressCard from "../components/AddressCard.jsx";

import { useQuery, gql } from "@apollo/client";

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

const mapStateToProps = (state) => ({
  isLandlord: state.currentUser.isLandlord,
  userData: state.currentUser.data,
});

const QUERY_LANDLORD_BY_ID = gql`
  query GetLandlordById($id: ID!) {
    landlord(id: $id) {
      _id
      overall_rating
      respect_rating
      responsiveness_rating
      addresses {
        _id
        street_num
        street
        apt_num
        city
        state
        zip_code
        overall_rating
        tlc
        personalization
        building_type
        beds
        baths
        price
        listing_link
      }
      reviews {
        _id
        title
        username
        overall_rating
        respect_rating
        responsiveness_rating
        bike_friendly
        pet_friendly
        tlc
        personalization
        description
        user {
          username
        }
      }
    }
  }
`;

const ProfilePage = ({ userData, isLoggedIn, isLandlord }) => {
  const [landlordData, setLandlordData] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [reviewData, setReviewData] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { landlordId } = useParams();
  const mounted = useRef(true);

  const queryLandlordId = landlordId || userData.landlord_id;
  let query;

  if(queryLandlordId){
    query = useQuery(QUERY_LANDLORD_BY_ID, {
        variables: { id: queryLandlordId },
      })
  }
  
  // const query = queryLandlordId
  //   ? useQuery(QUERY_LANDLORD_BY_ID, {
  //       variables: { id: queryLandlordId },
  //     })
  //   : null;

  // graphQL query to load landlord data, apartments, and reviews
  useEffect(() => {
    if (landlordId || isLandlord) {
      if (query.loading) return setLoading(true);
      mounted.current = true;
      if (mounted.current) {
        setLoading(false);
        setLandlordData(query.data);
        setAddresses(query.data.landlord.addresses);
        setReviewData(query.data.landlord.reviews);
      }
      return () => () => (mounted.current = false);
    }
  }, [query?.loading]);

  // fetches reviews submitted by the tenant about other landlord users
  const fetches = async () => {
    if (isLoggedIn && !(landlordId || isLandlord)) {
      await fetch(`/reviews/${userData._id}`)
        .then((res) => res.json())
        .then((json) => setReviewData(json.reviews))
        .catch((err) => console.log("Error fetching user reviews -->", err));
    }
  };

  useEffect(() => {
    fetches();
  }, [userData]);

  // onclick for create review button, sends user to create review route
  const handleReview = () =>
    navigate(`/review/${landlordId || userData.landlord_id}/`);

  return (
    <ThemeProvider theme={tomatopalette}>
      <div id="background">
        <Container className="MainContainer">
          {
            // insert loading animation here
            loading ? <>Loading...</> : null
          }
          {
            // if not logged in and no ID specified in url
            !loading && !landlordId && !isLoggedIn && (
              <div>Please login to view your profile</div>
            )
          }

          {
            // if landlord data is falsy on render
            // while URL specifies ID or landlord is logged in
            !loading && !landlordData && (landlordId || isLandlord) && (
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
                  <Card
                    sx={{
                      minWidth: 275,
                      backgroundColor: "whitesmoke",
                    }}
                  >
                    <CardContent>
                      <div className="ProfilePicture">
                        <img
                          style={{ height: "50px" }}
                          src={`/images/${userData.profile_pic}`}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <Box sx={{ width: "100%", bgcolor: "WhiteSmoke" }}>
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
                  <h3 id="userProfileGreeting">
                    Hello{","} {userData.full_name}
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
                    <Stack
                      spacing={2}
                      direction="row"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <Typography id="reviewStyling">Reviews</Typography>
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
                            <Button
                              id="createReview"
                              variant="contained"
                              onClick={handleReview}
                            >
                              Create Review
                            </Button>
                          </Stack>
                        )
                      }
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

          {addresses && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {addresses.map((address, i) => (
                <>
                  <AddressCard
                    address={address}
                    key={i}
                    isAddCard={false}
                    sx={{ margin: "10px" }}
                  />
                </>
              ))}
            </div>
          )}

          {
            // if review data fails to load when user is logged in
            // or URL specifies correct landlordId
            !loading &&
              !reviewData &&
              landlordData &&
              (isLoggedIn || landlordId) && (
                <div>Error 500: Loading reviews failed.</div>
              )
          }
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default connect(mapStateToProps, null)(ProfilePage);
