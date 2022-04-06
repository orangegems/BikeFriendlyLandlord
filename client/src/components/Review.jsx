import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Rating from '@material-ui/lab/Rating';

export function Review({
  title,
  overall_rating,
  respect_rating,
  responsiveness_rating,
  bike_rating,
  pet_friendly_rating,
  description,
}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent direction="row">
        <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
          <Typography className="Title" variant="h5" value={title}>
            {title}
          </Typography>
        </Stack>
        <Stack spacing={5} direction="row">
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Overall Rating</Typography>
            <Rating
              required
              size="small"
              precision={0.5}
              value={overall_rating}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Respectful</Typography>
            <Rating
              required
              size="small"
              precision={0.5}
              value={respect_rating}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Responsiveness</Typography>
            <Rating
              required
              size="small"
              precision={0.5}
              value={responsiveness_rating}
            />
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Bike</Typography>
            <div value={bike_rating}></div>
          </Stack>
          <Stack spacing={2} direction="row">
            <Typography variant="h7">Pet Friendly</Typography>
            <div value={pet_friendly_rating}></div>
          </Stack>
        </Stack>
        <Typography className="Description" variant="h7" value={description}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
