import React from "react";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';


export function Review (props){
    return(
        <Card sx={{ minWidth: 275 }}>
                    <CardContent direction="row">
                        <Stack direction= "row" sx={{justifyContent:'space-between'}}>
                            <Typography className="Title" variant="h5" >
                            {props.title}
                            </Typography>
                        </Stack>
                        <Stack spacing={5} direction="row" >
                            <Stack spacing={2} direction="row" >
                                <Typography variant= 'h7'>Overall Rating</Typography>
                                <Rating name="read-only" required size="small" precision={0.5} value={props.overall_rating} readOnly/>
                            </Stack>
                            <Stack spacing={2} direction="row" >
                                <Typography variant= 'h7'>Respectful</Typography>
                                <Rating name="read-only" required size="small" precision={0.5} value={props.respect_rating} readOnly/>  
                            </Stack>
                            <Stack spacing={2} direction="row">
                                <Typography variant= 'h7'>Responsiveness</Typography>
                                <Rating name="read-only" required size="small" precision={0.5} value={props.responsiveness_rating} readOnly/>
                            </Stack>
                            <Stack spacing={2} direction="row">
                                <Typography variant= 'h7'>Bike</Typography>
                                    {props.bike_rating}
                            </Stack>
                            <Stack spacing={2} direction="row">
                                <Typography variant= 'h7'>Pet Friendly</Typography>
                                    {props.pet_friendly_rating}
                            </Stack>  
                        </Stack>
                        <Typography className="Description" variant="h7">
                            {props.description}
                        </Typography>
                    </CardContent>
            </Card>
    );
}
        
    