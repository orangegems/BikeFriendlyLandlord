import React, { useEffect } from "react";
import { connect } from "react-redux";

// import MUI components
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { ThemeProvider } from "@mui/material/styles";

import ResultDisplay from "../components/ResultDisplay.jsx";
import * as actions from "../actions/actions.js";

//import theme
import tomatopalette from "../theme/tomatopalette.jsx";

const mapsDispatchToProps = (dispatch) => ({
  setSearchResults: (searchResults) =>
    dispatch(actions.searchResults(searchResults)),
});

function Search(props) {
  // handle search results

  // handle city input
  const [city, setCity] = React.useState("");

  // handle bike / pet friendly
  const [bikeR, setBikeR] = React.useState(false);
  const handleBikeRChange = (e) => {
    console.log(bikeR);
    setBikeR(!bikeR);
  };

  const [petR, setPetR] = React.useState(false);
  const handlePetRChange = (e) => {
    setPetR(!petR);
  };

  const [topL, setTopL] = React.useState(false);
  const handleSetLChange = (e) => {
    setTopL(!topL);
  }

  // Request to get values (NEED ALL ADDRESSES -> ALL CITIES)
  const [options, setOptions] = React.useState([]);
  useEffect(() => {
    const optionsArray = [];
    fetch(`http://localhost:3000/address/uniqueCities`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((parsed) => {
        console.log("Fetching cities...");
        for (let i = 0; i < parsed.length; i++) {
          optionsArray.push(parsed[i].city);
        }
        setOptions(optionsArray);
      })
      .catch((error) => console.log(error));
  }, []);

  // method to handle search :fetch request using all fields
  const handleSearch = () => {
    // build req body
    const formBody = {
      city: city,
      bike_friendly: bikeR,
      pet_friendly: petR,
      top_rated_landlords: topL,
    };

    //send request
    fetch("http://localhost:3000/landlords/search", {
      method: "POST",
      body: JSON.stringify(formBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      // response will need to be assigned to a variable to be sent to our results display
      .then((parsed) => {
        console.log(parsed);
        props.setSearchResults(parsed);
      })
      .catch((error) => console.log(error));
  };
  return (
    <ThemeProvider theme={tomatopalette}>
      <div className="searchPageMain">
        <Container className="searchMainContainer" maxwidth="sm" sx={{ p: 3 }}>
          <Box className="searchContainer" sx={{ p: 4 }}>
            <Stack
              className="searchFields"
              direction="column"
              spacing={4}
              justifyContent="center"
              alignItems="center"
            >
              <Stack
                direction="row"
                spacing={10}
                justifyContent="center"
                alignItems="center"
              >
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <h2>City</h2>
                  <Autocomplete
                    disablePortal
                    clearOnEscape
                    options={options}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select a City" />
                    )}
                    value={city}
                    onChange={(e, newVal) => {
                      setCity(newVal);
                    }}
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <h2>Bike Friendly</h2>
                  <Checkbox
                    checked={bikeR}
                    onChange={handleBikeRChange}
                    size="large"
                    style={{color: "white"}}
                  />
                </Stack>
                <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <h2>Pet Friendly</h2>
                  <Checkbox
                    checked={petR}
                    onChange={handlePetRChange}
                    size="large"
                    style={{color: "white"}}
                  />
                  </Stack>
                  <Stack
                  direction="row"
                  spacing={1}
                  justifyContent="center"
                  alignItems="center"
                >
                  <h2>Top Rated Landlords</h2>
                  <Checkbox
                    checked={topL}
                    onChange={handleSetLChange}
                    size="large"
                    style={{color: "white"}}
                  />
                </Stack>
              </Stack>
              <Button variant="contained" fullWidth onClick={handleSearch}>
                Search
              </Button>
            </Stack>
            <ResultDisplay />
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default connect(null, mapsDispatchToProps)(Search);
