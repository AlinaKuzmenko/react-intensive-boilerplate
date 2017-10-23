// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Instruments
import Styles from './styles.scss';


export default class Favourites extends Component {
    render () {
        return (
            <aside className = { Styles.favourites }>
                <header>Favourites</header>
                <ul>
                    <li>
                        <Link to = '/:movieID'>
                            <img alt = '' src = '' />
                            <span>Movie</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        );
    }
}
