import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Portfolio from './portfolio';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              My Portfolio
            </Typography>
            <Button color="inherit">About</Button>
            <Button color="inherit">Projects</Button>
            <Button color="inherit">Contact</Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Portfolio />
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default App;
