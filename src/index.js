// Core
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Instruments
import './theme/reset.css';

// App
import App from './containers/App';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));
