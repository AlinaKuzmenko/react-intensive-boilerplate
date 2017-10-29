// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Favourites from '../../components/Favourites';
import Home from '../../components/Home';


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
        this.searchMovie = ::this._searchMovie;
        this.sortByLatest = ::this._sortByLatest;
        this.sortByPopularity = ::this._sortByPopularity;
    }
    state = {
        activeTab: '',
        movies: {
            all: [],
            filtered: [],
            latest: [],
            popular: []
        }
    }
    getChildContext () {
        return options;
    }
    componentDidMount () {
        this.getMovies(1);
        this.getMovies(2);
        this.getMovies(3);
        this.getMovies(4);
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
            .then(({ results }) => {
                if (results !== this.state.movies.all) {
                    this.setState(() =>
                        Object.assign({}, this.state, {
                            movies: Object.assign({}, this.state.movies, {
                                all: [ ...this.state.movies.all, ...results]
                            })
                        })
                    );
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _searchMovie (query) {
        const { movies } = this.state;
        let moviesFiltered = [];

        if (!query) {
            moviesFiltered = movies.all;
        }
        moviesFiltered = movies.all.filter((movie) => {
            const title = movie.title.toLowerCase();

            return title.indexOf(query) !== -1;
        });
        this.setState(() =>
            Object.assign({}, this.state, {
                movies: Object.assign({}, this.state.movies, {
                    filtered: moviesFiltered
                })
            })
        );
    }
    _sortByLatest () {
        const { movies } = this.state;
        const sortByDate = (a, b) => {
            const aDate = new Date(a.release_date).getTime();
            const bDate = new Date(b.release_date).getTime();

            return bDate - aDate;
        };
        const moviesSorted = movies.all.sort(sortByDate);

        this.setState(() => ({
            activeTab: 'latest',
            movies: Object.assign({}, this.state.movies, {
                latest: moviesSorted
            })
        }));
    }
    _sortByPopularity () {
        const { movies } = this.state;
        const sortByPopularity = (a, b) => b.popularity - a.popularity;
        const moviesSorted = movies.all.sort(sortByPopularity);

        this.setState(() => ({
            activeTab: 'popular',
            movies: Object.assign({}, this.state.movies, {
                popular: moviesSorted
            })
        }));
    }
    render () {
        const {
            activeTab,
            movies
        } = this.state;
        let moviesShown;

        switch (activeTab) {
            case 'popular':
                console.log('switched to popular');
                moviesShown = movies.popular;
                break;
            case 'latest':
                console.log('switched to latest');
                moviesShown = movies.latest;
                break;
            default:
                console.log('switched to default');
                moviesShown = movies.all;
                break;
        }

        return (
            <div>
                <Header
                    activeTab = { activeTab }
                    searchMovie = { this.searchMovie }
                    sortByLatest = { this.sortByLatest }
                    sortByPopularity = { this.sortByPopularity }
                />
                <main style = { { position: 'relative' } }>
                    <Favourites />
                    <Home movies = { moviesShown } />
                </main>
            </div>
        );
    }
}
