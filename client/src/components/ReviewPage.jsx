import React, { Component } from 'react';
import { Link } from 'reacter-router-dom';

// import MUI components
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from  '@mui/material/Typography';
import Container from '@mui/material/Container';


class ReviewPage extends Component{
    constructor(props) {
        super(props)

        // have state that holds our input values (initially empty strings)
        this.state = {
            title: '',
            overallRating: 0,
            respectRating: 0,
            responsivenessRating: 0,
            bikeRating: 0,
            petRating: 0,
            description: ''
        };

        // bind necessary methods (send review to database, save values with setstate)
        this.handleTitleInput = this.handleTitleInput.bind(this)
    }

    // methods to handle inputs from components
    handleTitleInput(e){
        const {value} = e.target;
        this.setState({title: value})
    }

    // method to handle submit


    // method to handle going back

    render() {
        // will need the Landlord name from props

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
                                value={this.state.value}
                                onChange={this.handleTitleInput}/>
                            <Stack direction="row" spacing={2}>
                                <h2>Overall Rating</h2>
                                <Rating required size="large" value={ this.state.overallRating } readOnly />
                            </Stack>
                            <Stack direction="row" spacing={2}>
                                <h2>Respectiveness</h2>
                                <Rating required size="large" value={ this.state.respectRating }/>
                            </Stack>

                        </Box>
            </Container>
        )
    }
}