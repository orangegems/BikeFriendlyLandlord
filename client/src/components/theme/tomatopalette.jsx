import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';

// create our color palette
const tomatopalette = createTheme({
    palette: {
        primary: {
            main: '#ff6347',
            contrastText: '#fff'
        }
    }
})


export default tomatopalette;