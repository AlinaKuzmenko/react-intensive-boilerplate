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
        const { activeTab, movies: { all, latest } } = this.state;

        if (activeTab === 'latest') {

            return null;
        } else {
            this.setState(() => ({
                activeTab: 'latest',
                movies: { ...this.state.movies }
            }));
        }

        const sortByDate = (a, b) => {
            const aDate = new Date(a.release_date).getTime();
            const bDate = new Date(b.release_date).getTime();

            return bDate - aDate;
        };
        const moviesSorted = all.sort(sortByDate);

        this.setState(() => ({
            activeTab: 'latest',
            movies: Object.assign({}, this.state.movies, {
                latest: moviesSorted
            })
        }));
    }
    _sortByPopularity () {
        const { activeTab, movies: { all, popular } } = this.state;
        if (activeTab === 'popular') {

            return null;
        } else {
            this.setState(() => ({
                activeTab: 'popular',
                movies: { ...this.state.movies }
            }));
        }

        const sortByPopularity = (a, b) => b.popularity - a.popularity;
        const moviesSorted = all.sort(sortByPopularity);
    
        this.setState(() => ({
            movies: Object.assign({}, this.state.movies, {
                popular: moviesSorted
            })
        }));
    }

    render () {
        const {
            activeTab,
            movies: { all, latest, popular }
        } = this.state;
        let moviesShown;

        switch (activeTab) {
            case 'popular':
                moviesShown = popular;
                break;
            case 'latest':
                moviesShown = latest;
                break;
            default:
                moviesShown = all;
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
