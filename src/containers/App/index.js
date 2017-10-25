// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Main from '../../components/Main';

export const options = {
    api: 'https://api.themoviedb.org/3',
    key: 'a6f017bd0704106423cc1e6ff3a6cc1e',
    language: 'language=en-US',
    posterURL: `https://image.tmdb.org/t/p/w500`
};


export default class App extends Component {
    static childContextTypes = {
        api: string.isRequired,
        key: string.isRequired,
        language: string.isRequired,
        posterURL: string.isRequired
    }
    getChildContext () {
        return options;
    }
    constructor () {
        super();
        this.getLatestMovies = ::this._getLatestMovies;
        this.getMoviesGenres= ::this._getMoviesGenres;
        this.getMoviesByGenre = ::this._getMoviesByGenre;
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        movies: []
    }
    componentDidMount () {
        this.getLatestMovies();
    }
    _getMoviesGenres () {
        const { api, key } = options;
    
        fetch(`${ api }/genre/movie/list?api_key=${ key }`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not get latest movies');
                }
                return response.json();
            })
            .then((data) => {
            
                if (data !== this.state.movies) {
                    console.log('MoviesGenres: ', data);
                    this.setState(() => ({
                        movies: data,
                    }))
                
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _getMoviesByGenre () {
        const { api, key } = options;
    
        fetch(`${ api }/discover/movie?with_genres=28&api_key=${ key }`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not get latest movies');
                }
                return response.json();
            })
            .then((data) => {
            
                if (data !== this.state.movies) {
                    console.log('MoviesByGenre: ', data);
                    this.setState(() => ({
                        movies: data,
                    }))
                
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _getLatestMovies () {
        const { api, key } = options;

        fetch(`${ api }/discover/movie?api_key=${ key }&sort_by=release_date.desc&page=1&page=2&page=3&page=4`, {
            method: 'GET',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not get latest movies');
                }
                return response.json();
            })
            .then((data) => {
                if (data !== this.state.movies) {
                    this.setState(() => ({
                        movies: data,
                    }))
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
                <span onClick = { this.getMoviesByGenre }>search by genre</span>
                <span onClick = { this.getMoviesGenres }>get genres</span>
                <Main movies = { movies } />
            </div>
        );
    }
}
