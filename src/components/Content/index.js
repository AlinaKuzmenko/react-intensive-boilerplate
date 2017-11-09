import React, { Component } from 'react';
import { array, func, number } from 'prop-types';

import Movie from '../Movie';
import Styles from './styles.scss';


export default class Content extends Component {
    static propTypes = {
        addToFavourites:      func.isRequired,
        deleteFromFavourites: func.isRequired,
        favourites:           array,
        id:                   number,
        movies:               array
    };
    render () {
        const {
            addToFavourites,
            deleteFromFavourites,
            favourites,
            movies
        } = this.props;
        const moviesList = movies
            ? movies.map((movie) => {
                const setOfFavourites = new Set(favourites);
                const isFavourite = setOfFavourites.has(`${movie.id}`);

                return (
                    <Movie
                        addToFavourites = { addToFavourites }
                        deleteFromFavourites = { deleteFromFavourites }
                        isFavourite = { isFavourite }
                        key = { `movie-${movie.id}` }
                        movie = { movie }
                        setOfFavourites = { setOfFavourites }
                    />
                );
            })
            : null;

        return (
            <div className = { Styles.content }>
                { moviesList }
            </div>
        );
    }
}
