// Core
import React, { Component } from 'react';

// Instruments
import Movie from '../Movie';
import Styles from './styles.scss';
import { getUniqueID } from '../../helpers';



export default class Home extends Component {
    render () {
        const { movies } = this.props;
        const moviesList = movies
            ? movies.map((movie) => (
                <Movie
                    id = { movie.id }
                    key = {getUniqueID(7)}
                    name = { movie.title }
                    overview = { movie.overview }
                    poster = { movie.poster_path }
                    votes = { movie.vote_average }
                />
            ))
            : null;
        return (
            <section className = { Styles.home }>
                { moviesList }
            </section>
        );
    }
}
