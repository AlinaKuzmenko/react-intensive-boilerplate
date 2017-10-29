// Core
import React, { Component } from 'react';
import { array } from 'prop-types';

// Instruments
import { getUniqueID } from '../../helpers';
import Movie from '../Movie';
import Styles from './styles.scss';


export default class Home extends Component {
    static propTypes = {
        movies: array
    }
    render () {
        const { movies } = this.props;
        const moviesList = movies
            ? movies.map((movie) => (
                <Movie movie = { movie } />
            ))
            : null;

        return (
            <div className = { Styles.home }>
                { moviesList }
            </div>
        );
    }
}
