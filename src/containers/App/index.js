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
        movies: [],
        moviesGenres: []
    }
    getChildContext () {
        return options;
    }
    componentDidMount () {
        this.getMovies(1);
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
                console.log('Latest Movies', results);
                if (results !== this.state.movies) {
                    this.setState(() => ({
                        movies: results
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
                        genres: genres
                    }));
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _searchMovie (query) {
        console.log(`search a movie by query '${query}'`);
    }
    render () {
        const { movies } = this.state;

        return (
            <div>
                <Header searchMovie = { this.searchMovie } />
                <main style = {{ position: 'relative' }}>
                    <Favourites />
                    <Content movies = { movies } />
                </main>
            </div>
        );
    }
}
