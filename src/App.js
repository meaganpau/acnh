import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { Router } from '@reach/router';
import theme from './styles/theme';
import Navigation from './components/global/Navigation';
import CritterDex from './pages/critterdex';
import Villagers from './pages/villagers';

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Navigation />
            <Router primary={false}>
                <CritterDex path="/" />
                <Villagers path="/villagers" />
            </Router>
        </ThemeProvider>
    );
};

export default App;
