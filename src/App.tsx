import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Portfolio from './portfolio';
import MicrosoftProjects from './MicrosoftProjects';

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
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                My Portfolio
              </Typography>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/microsoft-projects">
                Microsoft Projects
              </Button>
            </Toolbar>
          </AppBar>
          <Routes>
            <Route path="/" element={
              <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Portfolio />
              </Container>
            } />
            <Route path="/microsoft-projects" element={<MicrosoftProjects />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
