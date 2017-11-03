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
        // !TODO: It's been working until I crashed a browser by calling getFavourites in the render method O.o
        // !TODO: I get a list of favourite movies ids and an array of movies from props and filter them (line 35)
        // !TODO: Then I add filtered movies (favouritesList) to state.favourites on componentDidMount in a getFavourites method
        // !TODO: State is changed, so a component has to be re-rendered but it isn't. Why?
        // !TODO: Favourites component is initialized in components/HomePage/index.js
        
        const { favourites } = this.state;
        const { movies } = this.props;
        const moviesList = favourites.length > 0 // try 'movies' instead of 'favourites'
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
                {/*!TODO: I can get favourites by clicking header*/}
                <header onClick = { this.getFavourites }>Favourites</header>
                <ul>
                    { moviesList }
                </ul>
            </aside>
        );
    }
}
