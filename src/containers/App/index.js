// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Main from '../../components/Main';

export const options = {
    api: 'https://api.themoviedb.org/4',
    key: 'a6f017bd0704106423cc1e6ff3a6cc1e',
    language: 'language=en-US'
};


export default class App extends Component {
    static childContextTypes = {
        api: string.isRequired,
        key: string.isRequired,
        language: string.isRequired,
    }
    getChildContext () {
        return options;
    }
    constructor () {
        super();
        this.getLatestMovie = ::this._getLatestMovie;
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        movies: []
    }
    componentDidMount () {
        this.getLatestMovie();
    }
    _getLatestMovie () {
        const { api, key } = options;

        fetch(`${ api }/list/api_key=${ key }`, {
            method: 'GET',
            
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Could not get latest movies');
                }
                return result.json();
            })
            .then((data) => {
                console.log('result', data);
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
        return (
            <div>
                <Header searchMovie = { this.searchMovie } />
                <Main />
            </div>
        );
    }
}
