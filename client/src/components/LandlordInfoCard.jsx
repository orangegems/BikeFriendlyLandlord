import React from "react";


import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Rating from '@mui/material/Rating';
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Icon from "@mui/material/Icon";


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
                                <Rating required size="large" precision={0.5} value={Number(props.overall_rating)}>
                                    
                                </Rating>
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Respectful</Typography>
                                <Rating required size="large" precision={0.5} value={Number(props.respect_rating)}/>  
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Responsiveness</Typography>
                                <Rating required size="large" precision={0.5} value={Number(props.responsiveness_rating)}/>
                            </Stack>
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Bike Friendly</Typography>
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
                            <Stack spacing={5} direction="row" sx={{m: 3, width: 'auto', justifyContent:'space-between'}}>
                                <Typography variant= 'h5'>Pet Friendly </Typography>
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
                    </Card>
    )
}

