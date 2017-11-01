// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Favourites from '../../components/Favourites';
import Home from '../../components/Home';


const APIKey = 'a6f017bd0704106423cc1e6ff3a6cc1e';

export const options = {
    api:           'https://api.themoviedb.org/3',
    discoverMovie: 'discover/movie',
    moviesGenres:  'genre/movie/list',
    key:           `api_key=${APIKey}`,
    latest:        '',
    popular:       'movie/popular',
    posterURL:     `https://image.tmdb.org/t/p/w500`
};


export default class App extends Component {
    static childContextTypes = {
        api:           string.isRequired,
        discoverMovie: string,
        moviesGenres:  string,
        key:           string.isRequired,
        latest:        string,
        popular:       string,
        posterURL:     string
    }
    constructor () {
        super();
        this.getMovies = ::this._getMovies;
        this.sortByLatest = ::this._sortByLatest;
        this.sortByPopularity = ::this._sortByPopularity;
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        activeTab: '',
        movies:    {
            all:      [],
            filtered: [],
            latest:   [],
            popular:  []
        }
    }
    getChildContext () {
        return options;
    }
    componentWillMount () {
        this.getMovies(1);
        this.getMovies(2);
        this.getMovies(3);
        this.getMovies(4);
    }
    _getMovies (pageNumber) {
        const { api, discoverMovie, key } = options;
        const { movies } = this.state;

        fetch(`${api}/${discoverMovie}?page=${pageNumber}&${key}`, {
            method: 'GET'
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error('Could not get latest movies');
                }

                return response.json();
            })
            .then(({ results }) => {
                if (results !== movies.all) {
                    this.setState(() =>
                        Object.assign({}, this.state, {
                            movies: Object.assign({}, this.state.movies, {
                                all: [...this.state.movies.all, ...results]
                            })
                        })
                    );
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _sortByLatest () {
        const { activeTab, movies } = this.state;

        if (activeTab === 'latest') {

            return;
        }
        this.setState(() => ({
            activeTab: 'latest',
            movies:    { ...movies }
        }));

        const sortByDate = (a, b) => {
            const aDate = new Date(a.release_date).getTime();
            const bDate = new Date(b.release_date).getTime();

            return bDate - aDate;
        };
        const moviesSorted = movies.all.sort(sortByDate);

        this.setState(() => ({
            activeTab: 'latest',
            movies:    Object.assign({}, movies, {
                latest: moviesSorted
            })
        }));
    }
    _sortByPopularity () {
        const { activeTab, movies } = this.state;

        if (activeTab === 'popular') {

            return;
        }
        this.setState(() => ({
            activeTab: 'popular',
            movies:    { ...movies }
        }));

        const sortByPopularity = (a, b) => b.popularity - a.popularity;
        const moviesSorted = movies.all.sort(sortByPopularity);

        this.setState(() => ({
            movies: Object.assign({}, movies, {
                popular: moviesSorted
            })
        }));
    }
    _searchMovie (query) {
        const { movies } = this.state;
        let moviesFiltered = [];

        if (!query) {
            moviesFiltered = movies.all;
            this.setState(() => ({
                activeTab: '',
                movies:    { ...movies }
            }));
        }
        moviesFiltered = movies.all.filter((movie) => {
            const title = movie.title.toLowerCase();

            return title.indexOf(query) !== -1;
        });
        this.setState(() =>
            Object.assign({}, this.state, {
                activeTab: '',
                movies:    Object.assign({}, movies, {
                    filtered: moviesFiltered
                })
            })
        );
    }
    render () {
        const {
            activeTab,
            movies: { all, latest, popular }
        } = this.state;
        let moviesShown = '';

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
                <main>
                    <Favourites />
                    <Home movies = { moviesShown } />
                </main>
            </div>
        );
    }
}
