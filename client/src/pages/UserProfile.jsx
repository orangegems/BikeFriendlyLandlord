import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Review } from "../components/Review.jsx";

export function UserProfile(props) {
  const { userData, setAuthDisplay, isLandlord } = props;
  const [reviews, setReviews] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    if (userData._id) {
      fetch(`/reviews/${userData._id}`)
        .then((res) => {
          // if the user is not authenticated, navigate them back to the hamepage and prompt them to login
          if (res.status === 401) {
            setAuthDisplay(true);
            navigate("/");
          } else {
            return res.json();
          }
        })
        .then((json) => {
          setReviews(json.reviews);
        })
        .catch((err) => {
          console.log("Error fenching users reviews -->", err);
        });
    }

  }, [userData]);

  return (
    <div id="userProfile">
      <h1 id="userProfileTitle">Your Account</h1>
      <h3>
        Hello {userData.full_name}
        {","}
      </h3>



      <div>
        <h4>Your Reviews</h4>
        {reviews.map((review, index) => {
          return (
            <Review
              userData={userData}
              username={review.username}
              title={review.title}
              overall_rating={review.overall_rating}
              respect_rating={review.respect_rating}
              responsiveness_rating={review.responsiveness_rating}
              bike_rating={review.bike_rating}
              pet_friendly_rating={review.pet_friendly}
              description={review.description}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
