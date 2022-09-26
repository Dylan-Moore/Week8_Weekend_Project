import { createTheme } from '@mui/material/styles';
interface PaletteColor {
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
}

export const theme = createTheme({
    palette:{
        primary:{
            main: '#ff0000'
        }
    }
})