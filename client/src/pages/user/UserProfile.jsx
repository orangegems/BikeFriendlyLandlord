import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { Review } from '../../compontents/Review.jsx';

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
      <h1>Your Account</h1>
      <h3>
        Hello {userData.full_name}
        {','}
      </h3>
      <div>
        <h4>Your Reviews</h4>
        {reviews.map((review) => {
          <Review
            title={review.title}
            overall_rating={review.overall_rating}
          />;
        })}
      </div>
    </div>
  );
}
