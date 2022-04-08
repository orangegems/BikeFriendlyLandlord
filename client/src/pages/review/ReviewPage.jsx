import React, { Component, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './reviewpage.css'

// import MUI components
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';


// import theme
import tomatopalette from '../../components/theme/tomatopalette.jsx'


export function ReviewPage({userData}) {

    // get landlord id
    const landlordID = useParams()
    console.log('landlordID:  ',landlordID)
    console.log('userdata:  ',userData)
    //get landlordName
    const [landlordName, setlandlordName] = React.useState('');

    useEffect(() => {
        fetch(`http://localhost:3000/landlords/getByID/${landlordID.landlord_id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then(parsed => {
            console.log(parsed)
            setlandlordName(parsed.first_name + ' ' + parsed.last_name)
        })
        .catch(error => {
            console.log(error)
        })
    }, []);


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
            username: userData.username,
            overall_rating: overallCalc(respect,response),
            respect_rating: respect,
            responsiveness_rating: response,
            bike_friendly: bike,
            pet_friendly: pet,
            description: description,
            user_id: userData.user_id,
            landlord_id: landlordID.landlord_id
        }

        fetch(`http://localhost:3000/reviews/${landlordID.landlord_id}`, {
            method: 'POST',
            body: JSON.stringify(formBody),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then (res => {
            console.log(res)
            window.location = `http://localhost:8080/landlord/${landlordID.landlord_id}`})
        .catch(error => console.log(error));
    }

        // will need the Landlord name from somewhere (props?)

        return (
        <ThemeProvider theme={tomatopalette}>
        <div className= "reviewPageGlobalContainer">
            <Container className="reviewMainContainer" maxwidth="sm" sx={{p:2}}>
                    <Box
                        className="reviewformContainer"
                        sx={
                            {p: 2}
                        }
                        >
                            <h2>Review of {landlordName}</h2>
                            <TextField 
                                fullWidth
                                required 
                                label="Title"
                                value={title}
                                onChange={handleTitleChange}
                                inputProps={{maxLength:100}}
                                helperText="Max 100 Characters"
                                sx={{mb:2, mt:2}}
                                />
                            <Grid container spacing={2}>
                                <Grid item xs={6}> 
                                    <h3 className="reviewLabel">Overall Rating</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating required size="large" precision={0.5} value={ overallCalc(respect,response) } readOnly />
                                </Grid>
                                <Grid item xs={6}>
                                    <h3 className="reviewLabel">Respectfulness</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating required size="large" precision={0.5} value={ respect } onChange={(e, val) => setRespect(val)}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3 className="reviewLabel">Responsiveness</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Rating required size="large" precision={0.5} value={ response } onChange={(e, val) => setResponse(val)}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3 className="reviewLabel">Bike Friendly?</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Checkbox checked={bike} onChange={handleBikeChange} size="medium" style={{paddingTop:4, paddingLeft:0}}/>
                                </Grid>
                                <Grid item xs={6}>
                                    <h3 className="reviewLabel">Pet Friendly?</h3>
                                </Grid>
                                <Grid item xs={6}>
                                    <Checkbox checked={pet} onChange={handlePetChange} size="medium" style={{paddingTop:4, paddingLeft:0}}/>
                                </Grid>
                            </Grid>
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
                                sx={{mb:2, mt:2}}
                            />
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    onClick={() => window.location.replace(`/landlord/${landlordID.landlord_id}`)}
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
        </div>
        </ThemeProvider>
        )
}
