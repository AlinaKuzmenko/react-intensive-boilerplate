// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';


export default class Movie extends Component {
    render () {
        return (
            <figure className = { Styles.movie } />
        );
    }
}
