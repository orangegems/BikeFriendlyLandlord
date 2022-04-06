import React from "react";
import { Link } from "react-router-dom";

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';

export function LandlordInfoCard (props){
    return(
                    <Card>
                            <Stack spacing={5} direction="row" sx={{ justifyContent:'space-between'}}>
                                <Typography variant= 'h3' sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                    {props.full_name}
                                </Typography>
                                {/* <Link to={`/reviews/$/`}><Button variant="contained" sx={{m: 3}}>Is this you?</Button></Link> */}
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Overall Rating</Typography>
                                <Rating required size="large" precision={0.5} value={props.overall_rating}/>
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Respectful</Typography>
                                <Rating required size="large" precision={0.5} value={props.respect_rating}/>  
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Responsiveness</Typography>
                                <Rating required size="large" precision={0.5} value={props.responsivenes_rating}/>
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Bike</Typography>
                                <Typography variant= 'h5'>{props.bike_rating}</Typography>
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Pet Friendly</Typography>
                                <Typography variant= 'h5'>{props.pet_friendly_rating}</Typography>
                            </Stack>  
                    </Card>
    )
}
