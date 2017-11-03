// Core
import React, { Component } from 'react';
import { array, string } from 'prop-types';

// Instruments
import { getUniqueID } from '../../helpers';
import Styles from './styles.scss';


export default class Favourites extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        favourites: array.isRequired,
        movies:     array.isRequired
    }
    static defaultProps = {
        favourites: [],
        movies:     []
    }
    constructor () {
        super();
        this.getFavourites = ::this._getFavourites;
    }
    state = {
        favourites: []
    }
    componentDidMount () {
        this.getFavourites();
    }
    _getFavourites () {
        const { favourites, movies } = this.props;
        const setOfFavourites = new Set(favourites);
        const favouritesList = movies.filter((movie) => {
            return setOfFavourites.has(`${movie.id}`);
        });
        this.setState(() => ({
            favourites: favouritesList
        }));
    }
    render () {
        const { posterURL } = this.context;
        // !TODO: WHY DOEST IT WORK WITH FAVOURITES INSTEAD OF MOVIES???
        const { favourites } = this.state;
        const { movies } = this.props;
        const moviesList = favourites.length > 0
            ? favourites.map(
                ({ poster_path: posterPath, title }) => ( // eslint-disable-line
                    <li key = { getUniqueID(15) }>
                        <img alt = '' src = { `${posterURL}/${posterPath}` } />
                        <span>{ title }</span>
                    </li>
                )
            )
            : <li>No movies</li>;

        return (
            <aside className = { Styles.favourites }>
                <header>Favourites</header>
                <ul>
                    { moviesList }
                </ul>
            </aside>
        );
    }
}
