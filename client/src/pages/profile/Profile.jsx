import * as React from 'react';
import {Link } from "react-router-dom";

import { Review } from '../../components/Review.jsx';
import { LandlordInfoCard } from '../../components/LandlordInfoCard.jsx'

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
import { useParams } from 'react-router-dom';
import axios from 'axios';





// const landlordData = {
//     landlord_id: 1,
//     full_name : "demoLandlord",
//     overall_rating : 3,
//     respect_rating : 2,
//     responsiveness_rating: 2,
//     bike_rating : true,
//     pet_friendly_rating : true,
//     is_verified: true
// }

const reviewData = [
        {
        title: 'Promises not kept',
        overall_rating: 2,
        respect_rating: 3,
        responsiveness_rating: 2,
        bike_rating:true,
        pet_friendly_rating:false,
        description:'He was the worst. Promised me that my roommate and I can bring bikes. Ended up not letting us.'
        }
    ];





export default function ProfilePage() {

    const [landlordData,setLandlordData] = React.useState({})

    const landlordId = useParams();
    React.useEffect(() => {
        axios.get(`http://localhost:3000/landlords/getById/${landordId}`)
        .then (res => {res.json()})
        .then (landlordObject => {
            setLandlordData(landlordObject)
        })
    })

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
                    <LandlordInfoCard {...landlordData}/>
                </Stack>
            </Stack>
            <Container>
                <Stack spacing={2} direction="row" >
                    <Typography variant="h3" gutterBottom component="div">
                    Reviews
                    </Typography>
                    <Stack sx={{display: 'flex', alignItems: 'center', p: 1, m: 1,}}>
                        <Link to={`/reviews/${landlordId}/`}><Button variant="contained">Create Review</Button></Link>
                    </Stack>
                </Stack>
                <Stack>
                    <div>
                        {reviewData.map(eachReview => (
                            <Review { ...eachReview}/>
                        ))}
                    </div>
                </Stack>
            </Container>
      </Container>
    )
}