import * as React from 'react';
import {Link } from "react-router-dom";

import Review from '../../components/Review.jsx';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import { styled } from '@mui/material/styles';
import Rating from '@material-ui/lab/Rating';



//need to create query to gather data
//like one here for the tables below

const landlordData = {
    full_name : "",
    overall_rating : "",
    respect_rating : '',
    bike_rating : '',
    pet_friendly_rating : ''
}

const reviewData = [
        {
        title: 'Promises not kept',
        overall_rating: '3',
        respect_rating: '4',
        responsiveness_rating: '2',
        bike_rating:'true',
        pet_friendly_rating:'false',
        description:'He was the worst. Promised me that my roommate and I can bring bikes. Ended up not letting us.'
        }
    ];





export default function ProfilePage() {
    return (
        <Container className="MainContainer" sx={{m:2,pt:3,pr:4, justifyContent: 'center'}}>
            <Stack className="LandlordInfo" sx={{pb:5, pl:5}} direction="row" justifyContent="space-around">
                <Stack>
                    <Card sx={{ minWidth: 275 }}>
                        <CardContent>
                            <div class="ProfilePicture">
                                <img src="img/doglord.jpeg"/>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        <nav aria-label="main mailbox folders">
                            <List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <EmailIcon />
                                </ListItemIcon>
                                <ListItemText primary="Email" />
                                <ListItemText />
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <LocalPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary="Phone Number" />
                                </ListItemButton>
                            </ListItem>
                            </List>
                            <ListItem disablePadding>
                                <ListItemButton>
                                <ListItemIcon>
                                    <ApartmentIcon />
                                </ListItemIcon>
                                <ListItemText primary="Office Location" />
                                </ListItemButton>
                            </ListItem>
                        </nav>
                        </Box>
                    </Card>
                </Stack>
                <Stack>
                    <Card>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Overall Rating</Typography>
                                <Rating required size="large" precision={0.5} value='2' />
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Respectful</Typography>
                                <Rating required size="large" precision={0.5} value='2' />  
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Responsiveness</Typography>
                                <Rating required size="large" precision={0.5} value='2' />
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Bike</Typography>
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Pet Friendly</Typography>
                            </Stack>  
                    </Card>
                </Stack>
            </Stack>
            <Container>
                <Stack spacing={2} direction="row" >
                    <Typography variant="h3" gutterBottom component="div">
                    Reviews
                    </Typography>
                    <Stack sx={{display: 'flex', alignItems: 'center', p: 1, m: 1,}}>
                        <Link to="/review/:landlord_id"><Button variant="contained">Create Review</Button></Link>
                    </Stack>
                </Stack>
                <Stack>
                    <Review />
                </Stack>
            </Container>
      </Container>
    )
}