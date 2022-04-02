import React, { Component } from 'react';
import { Link } from 'reacter-router-dom';

// import MUI components
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from  '@mui/material/Typography';
import Container from '@mui/material/Container';



export default function ReviewPage() {
    // handle title input (limit 100)
    const [title, setTitle] = React.useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // handle rating inputs
    const [respect, setRespect] = React.useState(null)
    const [response, setResponse] = React.useState(null)
    const [bike, setBike] = React.useState(null)
    const [pet, setPet] = React.useState(null)

    //handle description input (limit 1000)
    const [description, setDescription] = React.useState('');
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }

    // method to handle form submission


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
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <h2>Overall Rating</h2>
                                <Rating required size="large" precision={0.5} value={ 5 } readOnly />
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <h2>Respectiveness</h2>
                                <Rating required size="large" precision={0.5} value={ respect } onChange={(e, val) => setRespect(val)}/>
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <h2>Responsiveness</h2>
                                <Rating required size="large" precision={0.5} value={ response } onChange={(e, val) => setResponse(val)}/>
                            </Stack>
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <h2>Bike Friendly</h2>
                                <Rating required size="large" precision={0.5} value={ bike } onChange={(e, val) => setBike(val)}/>
                            </Stack>                            
                            <Stack direction="row" spacing={2} justifyContent="center">
                                <h2>Pet Friendly</h2>
                                <Rating required size="large" precision={0.5} value={ pet } onChange={(e, val) => setPet(val)}/>
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
                                >
                                    Submit
                                </Button>
                            </Stack>
                    </Box>

            </Container>
        )
}
