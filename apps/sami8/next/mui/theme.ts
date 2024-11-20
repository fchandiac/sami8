// theme.js
'use client';
import { colors } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  
  components: {
  //  MuiTextField: {
  //   styleOverrides: {
  //     root: {
  //       // Outlined
  //       "& .MuiOutlinedInput-root": {
  //         color: "#1d1d1d",
  //         "& .MuiOutlinedInput-notchedOutline": {
  //           borderColor: "#1d1d1d",
  //           borderWidth: "1.5px",
  //         },
  //         "&.Mui-focused": {
  //           "& .MuiOutlinedInput-notchedOutline": {
  //             borderColor: "#1d1d1d", // secondary.main
  //             borderWidth: "2px",
  //           },
  //         },
  //         "&:hover:not(.Mui-focused)": {
  //           "& .MuiOutlinedInput-notchedOutline": {
  //             borderColor: "#1d1d1d",
  //           },
  //         },
  //       },
  //       "& .MuiInputLabel-outlined": {
  //         color: "#1d1d1d",
  //         "&.Mui-focused": {
  //           color: "#1d1d1d",
  //         },
  //       },
  //       // Filled
  //       "& .MuiFilledInput-root": {
  //         color: "#1d1d1d",
  //         backgroundColor: "#e7e7e7",
  //         borderTopLeftRadius: "7px",
  //         borderTopRightRadius: "7px",
  //         "&:before": {
  //           borderColor: "#2e2e2e",
  //           borderWidth: "2px",
  //         },
  //         "&:after": {
  //           borderColor: "secondary.main",
  //           borderWidth: "3px",
  //         },
  //         ":hover:not(.Mui-focused)": {
  //           "&:before": {
  //             borderColor: "#e7e7e7",
  //             borderWidth: "2px",
  //           },
  //           backgroundColor: "#f4f4f4",
  //         },
  //       },
  //       "& .MuiInputLabel-filled": {
  //         color: "#2e2e2e",
  //         fontWeight: "bold",
  //         "&.Mui-focused": {
  //           color: "secondary.main",
  //         },
  //       },
  //       // Standard
  //       "& .MuiInput-root": {
  //         color: "#1d1d1d",
  //         fontFamily: "Arial",
  //         fontWeight: "bold",
  //         "&:before": {
  //           borderColor: "#2e2e2e",
  //           borderWidth: "2px",
  //         },
  //         "&:after": {
  //           borderColor: "secondary.main",
  //           borderWidth: "3px",
  //         },
  //         ":hover:not(.Mui-focused)": {
  //           "&:before": {
  //             borderColor: "#e7e7e7",
  //             borderWidth: "2px",
  //           },
  //         },
  //       },
  //     },
  //   },

  //  },

    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-contained': {
            borderRadius: 20,
          },
          '&.Mui-disabled': {
            borderRadius: 20,
          }
          
          
        },
      },
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.MuiMenuItem-gutters': {
            paddingLeft: '20px',
            paddingRight: '2px',
            paddingTop: '0px',
            paddingBottom: '0px',
            margin: '0px',
          },
        },
      },
    }
    
  },



  palette: {
    primary: {
      main: '#1d1d1d',
      contrastText: '#fff',
    },
    
    secondary: {
      main: '#ff4081', // Un color secundario
    },
    // divider: '#ff4081',
    divider: '#FFC1D5',
    background: {
      default: '#88C200',
    },

    
  },
});

export default theme;


// Tints of Violet Red #FF4081
// #FF4081 *
// #FF669A
// #FF85AE
// #FF9DBE
// #FFB1CB
// #FFC1D5
// #FFCDDD
// #FFD7E4
// #FFDFE9
// #FFE5ED
// White
