// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Main from '../../components/Main';

export const options = {
    api: 'https://api.themoviedb.org/3/discover/movie',
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
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        movies: []
    }
    componentDidMount () {
        this.getLatestMovies();
    }
    _getLatestMovies () {
        const { api, key } = options;

        fetch(`${ api }?api_key=${ key }&sort_by=release_date.desc`, {
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
                <Main movies = { movies } />
            </div>
        );
    }
}
