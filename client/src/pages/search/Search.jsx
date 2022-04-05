import React, {Component, useEffect } from 'react';
// import { Link } from 'react-router-dom'

// import MUI components
import Button from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  Checkbox  from '@mui/material/Checkbox';


export default function SearchPage() {
    // handle city input
    const [city, setCity] = React.useState('');

    // handle bike / pet friendly
    const [bikeR, setBikeR] = React.useState(false);
    const handleBikeRChange = (e) => {
        setBikeR(!bikeR);
    }

    const [petR, setPetR] = React.useState(false);
    const handlePetRChange = (e) => {
        setPetR(!petR);
    }

    // Request to get values 

    // method to handle search


    return (
        <Container className = "searchMainContainer" maxwidth ="sm">
            <div>
                <h1>Search</h1>
            </div>
            <Box
                className = "searchContainer"
                sx = {
                    {p: 2, border: '1px solid grey'}
                }
                >
                    <Box className="searchFields">
                        <Stack direction="row" spacing={10} justifyContent="center" alignItems="center">
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                <h2>City</h2>
                                <Autocomplete
                                disablePortal
                                clearOnEscape
                                options={['Test1', 'Test2']}
                                sx={{width:300}}
                                renderInput={(params) => <TextField {...params} label="Select a City"/>}
                                value={city}
                                onChange={(e, newVal) => {setCity(newVal);}}
                                />
                            </Stack>
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                 <h2>Bike Friendly</h2>
                                <Checkbox checked={bikeR} onChange={handleBikeRChange} size="large"/>
                            </Stack>
                            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                    <h2>Pet Friendly</h2>
                                    <Checkbox checked={petR} onChange={handlePetRChange} size="large" />
                             </Stack>
                        </Stack>
                    </Box>
                </Box>
        </Container>
    )
}