import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Review } from '../compontents/Review.jsx'

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
        console.log('check response -->', json);
        setReviews(json.reviews);
      })
      .catch((err) => {
        console.log('Error fenching users reviews -->', err);
      });
  }, []);

  return (
    <div>
      <p>
        Hello {userData.full_name}
        {','}
      </p>
      <div>
        <h3>Your Reviews</h3>
        {reviews.map(review => {
          // <Review /** props*/>;
        })}
      </div>
    </div>
  );
}
