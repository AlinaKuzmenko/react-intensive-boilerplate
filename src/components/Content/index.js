// Core
import React, { Component } from 'react';
import { array } from 'prop-types';

// Instruments
import Home from '../Home';
import MoviePage from '../MoviePage';
import Styles from './styles';

export default class Content extends Component {
    static propTypes= {
        movies: array
    }
    render () {
        const { movies } = this.props;

        return (
            <div className = { Styles.content }>
                <Home movies = { movies } />
            </div>
        );
    }
}
