import React from "react";
import HomeCard from "./HomeCard.jsx";

export default function homeCards(props) {
  console.log(props.topFour.length);
  if (props.topFour.length > 0) {
    props.topFour.map((landlordObj, index) => (
      <HomeCard landlord={landlordObj} key={index} />
    ));
  }
  return (
    <div className="homeCardsWrapper">
      <div
        className="homeCards"
        data-aos="fade-up"
        data-aos-duration="1000"
        id="homeCards"
      >

        {props.topFour}
      </div>
      <div
        className="homeCardsUserFeedbackWrapper"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="250"
      >
        <div className="homeCardsUserFeedback">
          <p className="feedbackDesc">
            My new landlord is a great fit for me and my needs! Thanks tenancy!
          </p>
          <p className="feedbackUser">- Dewey Palmer</p>
        </div>
        <div className="homeCardsUserFeedback">
          <p className="feedbackDesc">
            My last landlord was a ghost...now I can find responsive landlords!
          </p>
          <p className="feedbackUser">- Rachelle Acrich</p>
        </div>
      </div>
    </div>
  );
}
