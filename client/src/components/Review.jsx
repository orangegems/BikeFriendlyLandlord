import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Icon from "@mui/material/Icon";


export function Review (props){
  console.log(props.username)
    return(
        <Card sx={{ minWidth: 275 }}>
                    <CardContent direction="row">
                        <Stack direction= "row" sx={{justifyContent:'space-between'}}>
                            <Typography className="Title" variant="h5" >
                            {props.title}
                            </Typography>
                            <Typography className="username" >
                            {'posted by '}{props.username}
                            </Typography>
                        </Stack>
                        <Stack spacing={5} direction="row" >
                            <Stack spacing={2} direction="row" >
                                <Typography variant= 'h7'>Overall Rating</Typography>
                                <Rating style={{ color: "tomato" }} name="read-only" required size="small" precision={0.5} value={Number(props.overall_rating)} readOnly/>
                            </Stack>
                            <Stack spacing={2} direction="row" >
                                <Typography variant= 'h7'>Respectful</Typography>
                                <Rating style={{ color: "tomato" }} name="read-only" required size="small" precision={0.5} value={Number(props.respect_rating)} readOnly/>  
                            </Stack>
                            <Stack spacing={2} direction="row">
                                <Typography variant= 'h7'>Responsiveness</Typography>
                                <Rating style={{ color: "tomato" }} name="read-only" required size="small" precision={0.5} value={Number(props.responsiveness_rating)} readOnly/>
                            </Stack>
                            <Stack spacing={2} direction="row">
                                <Typography variant= 'h7'>Bike</Typography>
                                <Icon>
                                    {props.bike_friendly ? (
                                        <CheckIcon
                                        style={{ color: "limeGreen", fontSize: "20px" }}
                                        ></CheckIcon>
                                    ) : (
                                        <ClearIcon style={{ color: "tomato", fontSize: "20px" }} />
                                    )}
                                </Icon>
                            </Stack>
                            <Stack spacing={2} direction="row">
                                <Typography variant= 'h7'>Pet Friendly</Typography>
                                <Icon>
                                    {props.pet_friendly ? (
                                        <CheckIcon
                                        style={{ color: "limeGreen", fontSize: "20px" }}
                                        ></CheckIcon>
                                    ) : (
                                        <ClearIcon style={{ color: "tomato", fontSize: "20px" }} />
                                    )}
                                </Icon>
                            </Stack>  
                        </Stack>
                        <Typography className="Description" variant="h7">
                            {props.description}
                        </Typography>
                    </CardContent>
            </Card>
    );
}
