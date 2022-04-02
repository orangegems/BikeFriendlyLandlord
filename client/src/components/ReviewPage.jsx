import React, { Component, useEffect } from 'react';
// import { Link } from 'reacter-router-dom';

// import MUI components
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import Typography from  '@mui/material/Typography';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';


export default function ReviewPage({username, user_id, landlord_id}) {
    // handle title input (limit 100)
    const [title, setTitle] = React.useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };


    // calculate overall rating
    const overallCalc = (...values) => {
        const arr = [...values];
        const newArr = arr.filter(val => val !== null);
        if (newArr.length === 0) return 0;
        return (newArr.reduce((a,b) => a+b)/(newArr.length))
    }
    // handle rating inputs
    const [respect, setRespect] = React.useState(null)
    const [response, setResponse] = React.useState(null)

    // handle bike / pet friendly
    const [bike, setBike] = React.useState(false)
    const handleBikeChange = (e) => {
        setBike(!bike);
    }

    const [pet, setPet] = React.useState(false)
    const handlePetChange =(e) => {
        setPet(!pet)
    }

    //handle description input (limit 1000)
    const [description, setDescription] = React.useState('');
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }

    // method to handle form submission
    const sendReview = () => {
        // build req body
        const formBody = {
            title: title,
            username: 'evanmcneely',
            overall_rating: overallCalc(respect,response),
            respect_rating: respect,
            responsiveness_rating: response,
            bike_friendly: bike,
            pet_friendly: pet,
            description: description,
            user_id: 15,
            landlord_id: 1
        }

        fetch(`http://localhost:3000/reviews/1`, {
            method: 'POST',
            body: JSON.stringify(formBody),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then (res => console.log(res));
    }

        // will need the Landlord name from somewhere (props?)

        return (
            <Container className="reviewMainContainer" maxwidth="sm">
                <div>
                    <h1>Leave a Review</h1>
                </div>
                    <Box
                        className="reviewformContainer"
                        sx={
                            {p: 2, border: '1px solid grey'}
                        }
                        >
                            <h2>Review of {'landlordnamehere'}</h2>
                            <TextField 
                                fullWidth 
                                required 
                                label="Title"
                                value={title}
                                onChange={handleTitleChange}
                                inputProps={{maxLength:100}}
                                helperText="Max 100 Characters"
                                />
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <h3>Overall Rating</h3>
                                <Rating required size="large" precision={0.5} value={ overallCalc(respect,response) } readOnly />
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <h3>Respectiveness</h3>
                                <Rating required size="large" precision={0.5} value={ respect } onChange={(e, val) => setRespect(val)}/>
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <h3>Responsiveness</h3>
                                <Rating required size="large" precision={0.5} value={ response } onChange={(e, val) => setResponse(val)}/>
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <h3>Bike Friendly?</h3>
                                <Checkbox checked={bike} onChange={handleBikeChange} size="large"/>
                            </Stack>                            
                            <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                                <h3>Pet Friendly?</h3>
                                <Checkbox checked={pet} onChange={handlePetChange} size="large"/>
                            </Stack>
                            <TextField
                                fullWidth
                                required
                                label="Additional Comments"
                                multiline
                                rows={4}
                                inputProps={{maxLength:1000}}
                                helperText="Max 1000 Characters"
                                value={ description }
                                onChange={ handleDescChange}
                            />
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={(sendReview)}
                                >
                                    Submit
                                </Button>
                            </Stack>
                    </Box>

            </Container>
        )
}
