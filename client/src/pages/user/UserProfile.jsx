import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Review } from '../../components/Review.jsx';

import './userProfile.css'

export function UserProfile(props) {
  const { userData, setUserData, setIsLoggedIn, setAuthDisplay } = props;
  const [reviews, setReviews] = useState([]);
  let navigate = useNavigate();
  // let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // fetch('/auth/check', {
    //   method: 'POST',
    // })
    //   .then((res) => {
    //     if (res.status === 401) {
    //       setIsLoggedIn(false);
    //       setAuthDisplay(true);
    //       navigate('/');
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('Error check login -->', err);
    //   });

    fetch(`/reviews/${userData._id}`)
      .then((res) => {
        if (res.status === 401) {
          setIsLoggedIn(false);
          setAuthDisplay(true);
          navigate('/');
        } else {
          console.log(res);
          return res.json();
        }
      })
      .then((json) => {
        setReviews(json.reviews);
      })
      .catch((err) => {
        console.log('Error fenching users reviews -->', err);
      });
  }, []);

  return (
    <div id="userProfile">
      <div id="userProfileTitle">Your Account</div>
      <h3>
        Hello {userData.full_name}
        {','}
      </h3>
      <div>
        <h4>Your Reviews</h4>
        {reviews.map((review) => {
          return <Review
            title={review.title}
            overall_rating={review.overall_rating}
            respect_rating={review.respect_rating}
            responsiveness_rating={review.responsiveness_rating}
            bike_rating={review.bike_rating}
            pet_friendly_rating={review.pet_friendly}
            description={review.description}
          />;
        })}
      </div>
    </div>
  );
}
