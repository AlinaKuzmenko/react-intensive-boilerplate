// Core
import React, { Component } from 'react';

// Instruments
import Movie from '../Movie';
import Styles from './styles.scss';


export default class Home extends Component {
    render () {
        return (
            <section className = { Styles.home }>
                <Movie />
                <Movie />
                <Movie />
            </section>
        );
    }
}
