// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Favourites from '../../components/Favourites';
import Content from '../../components/Content';


const APIKey = 'a6f017bd0704106423cc1e6ff3a6cc1e';

export const options = {
    api: 'https://api.themoviedb.org/3',
    discoverMovie: 'discover/movie',
    moviesGenres: 'genre/movie/list',
    key: `api_key=${APIKey}`,
    latest: '',
    popular: 'movie/popular',
    posterURL: `https://image.tmdb.org/t/p/w500`
};


export default class App extends Component {
    static childContextTypes = {
        api: string.isRequired,
        discoverMovie: string,
        moviesGenres: string,
        key: string.isRequired,
        latest: string,
        popular: string,
        posterURL: string
    }
    constructor () {
        super();
        this.getMovies = ::this._getMovies;
        this.getMoviesGenres= ::this._getMoviesGenres;
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        filteredMovies: [],
        movies: [],
        moviesGenres: [],
        totalResults: 0
    }
    getChildContext () {
        return options;
    }
    componentDidMount () {
        this.getMovies(1);
        this.getMovies(2);
        this.getMovies(3);
        this.getMovies(4);
        this.getMoviesGenres();
    }
    _getMovies (pageNumber) {
        const { api, discoverMovie, key } = options;

        fetch(`${api}/${discoverMovie}?page=${pageNumber}&${key}`, {
            method: 'GET'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not get latest movies');
                }

                return response.json();
            })
            .then(({ results, total_results }) => {
                if (results !== this.state.movies) {
                    this.setState(() => ({
                        movies: [...this.state.movies, ...results],
                        totalResults: total_results
                    }));
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _getMoviesGenres () {
        const { api, key, moviesGenres } = options;

        fetch(`${api}/${moviesGenres}?${key}`, {
            method: 'GET'
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not get latest movies');
                }

                return response.json();
            })
            .then(({ genres }) => {
                if (genres !== this.state.movies) {
                    this.setState(() => ({
                        genres
                    }));
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _searchMovie (query) {
        const { movies } = this.state;
        let moviesFiltered = [];

        console.log('query', query);
        if (!query) {
            moviesFiltered = movies;
        }
        moviesFiltered = movies.filter((movie) => {
            const title = movie.title.toLowerCase();

            return title.indexOf(query) !== -1;
        });
        this.setState(() => ({
            filteredMovies: moviesFiltered
        }));
    }
    render () {
        const { movies, filteredMovies, totalResults } = this.state;
        const moviesShown = filteredMovies.length !== 0 ? filteredMovies : movies;

        return (
            <div>
                <Header searchMovie = { this.searchMovie } />
                <main style = { { position: 'relative' } }>
                    <Favourites />
                    <Content movies = { moviesShown } />
                </main>
            </div>
        );
    }
}
