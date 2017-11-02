// Core
import React, { Component } from 'react';
import { array, func } from 'prop-types';

// Instruments
import { getUniqueID } from '../../helpers';
import Movie from '../Movie';
import Styles from './styles.scss';


export default class Home extends Component {
    static propTypes = {
        addToFavourites:      func.isRequired,
        deleteFromFavourites: func.isRequired,
        favourites:           array,
        movies:               array
    }
    render () {
        const { addToFavourites, deleteFromFavourites, favourites, movies } = this.props;
        const moviesList = movies
            ? movies.map((movie) => {
                const setOfFavourites = new Set(favourites);
                const isFavourite = setOfFavourites.has(`${movie.id}`);

                return (
                    <Movie
                        addToFavourites = { addToFavourites }
                        deleteFromFavourites = { deleteFromFavourites }
                        isFavourite = { isFavourite }
                        key = { getUniqueID(7) }
                        movie = { movie }
                        setOfFavourites = { setOfFavourites }
                    />
                );
            })
            : null;

        return (
            <div className = { Styles.home }>
                { moviesList }
            </div>
        );
    }
}
