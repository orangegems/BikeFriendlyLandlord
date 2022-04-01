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
    // handle title input
    const [title, setTitle] = React.useState('');
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // handle rating inputs
    const [respect, setRespect] = React.useState(null)
    const [response, setResponse] = React.useState(null)
    const [bike, setBike] = React.useState(null)
    const [pet, setPet] = React.useState(null)

    //handle description input
    const [description, setDescription] = React.useState('');
    const handleDescChange = (e) => {
        setDescription(e.target.value);
    }

    // method to handle going back


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
                        }>
                            <h2>Review of {'landlordnamehere'}</h2>
                            <TextField 
                                fullWidth 
                                required 
                                label="Title"
                                value={title}
                                onChange={handleTitleChange}
                                />
                            <Stack direction="row" spacing={2}>
                                <h2>Overall Rating</h2>
                                <Rating required size="large" precision={0.5} value={ 5 } readOnly />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <h2>Respectiveness</h2>
                                <Rating required size="large" precision={0.5} value={ respect } onChange={(e, val) => setRespect(val)}/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <h2>Responsiveness</h2>
                                <Rating required size="large" precision={0.5} value={ response } onChange={(e, val) => setResponse(val)}/>
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <h2>Bike Friendly</h2>
                                <Rating required size="large" precision={0.5} value={ bike } onChange={(e, val) => setBike(val)}/>
                            </Stack>                            <Stack direction="row" spacing={2}>
                                <h2>Pet Friendly</h2>
                                <Rating required size="large" precision={0.5} value={ pet } onChange={(e, val) => setPet(val)}/>
                            </Stack>
                            <TextField
                                fullWidth
                                required
                                label="Additional Comments"
                                multiline
                                rows={4}
                                inputProps={{maxLength:200}}
                                helperText="Max 200 Characters"
                                value={ description }
                                onChange={ handleDescChange}
                            />
                        </Box>
            </Container>
        )
}
