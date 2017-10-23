// Core
import React from 'react';
import { Link } from 'react-router-dom';

// Instruments
import Styles from './styles.scss';


const Header = () => (
    <header className = { Styles.header }>
        <h1>
            <Link to = '/'>Moviesearcha</Link>
        </h1>
        <input type = 'text' />
    </header>
);

export default Header;
