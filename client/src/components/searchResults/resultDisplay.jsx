import React, { useEffect} from 'react';
import Box from '@mui/material/Box';

// import Homecard component
import HomeCard from "../homeCard/HomeCard.jsx"


export default function ResultDisplay( {resultsArr} ) {

    console.log(resultsArr)
    // set up onclick to route to the respective landlord id
    // render our cards out

    if (!resultsArr){
    return(
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                p: 1,
                m: 1,
                bgcolor: 'background.paper',
                maxWidth: 1000,
                borderRadius: 1
            }}
        >
            <div>
                {/* {resultsArr.map((landlordObj, index) => <HomeCard landlord={landlordObj} key={index}/>)} */}
            </div>
        </Box>
    )}
    else {
        return(
            <div className="homeCards" data-aos="fade-up" data-aos-duration="1000" id="homeCards">
              {resultsArr.map((landlordObj, index) => <HomeCard landlord={landlordObj} key={index}/>)}
            </div>
        )
    }

}