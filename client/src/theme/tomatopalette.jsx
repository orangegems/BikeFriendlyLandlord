import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

// create our color palette
const tomatopalette = createTheme({
    palette: {
        primary: {
            // main: '#ff6347',
            main: '#333',
            contrastText: '#rgb(237, 232, 251)'
        }
    }
})


export default tomatopalette;