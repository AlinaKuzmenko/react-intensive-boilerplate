// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Favourites from '../../components/Favourites';
import Home from '../../components/Home';
import Styles from './';


export default class HomePage extends Component {
    static contextTypes = {
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
        this.searchMovie = ::this._searchMovie;
        this.getFavourites = ::this._getFavourites;
        this.addToFavourites = ::this._addToFavourites;
        this.deleteFromFavourites = ::this._deleteFromFavourites;
        this.sortMovies = ::this._sortMovies;
        this.toggleTabs = ::this._toggleTabs;
    }
    state = {
        activeTab: '',
        movies:    {
            all:        [],
            favourites: [],
            filtered:   [],
            latest:     [],
            popular:    []
        }
    }
    componentWillMount () {
        this.getMovies(1);
        this.getMovies(2);
        this.getMovies(3);
        this.getMovies(4, true);
        this.getFavourites();
    
    }
    _getMovies (pageNumber, sort) {
        const { api, discoverMovie, key } = this.context;
        const { movies } = this.state;

        fetch(`${api}/${discoverMovie}page=${pageNumber}&${key}`, {
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
                    // !TODO: 'movies' is already declared in the upper scope
                    this.setState(({ movies }) =>
                        Object.assign({}, this.state, {
                            movies: Object.assign({}, movies, {
                                all: [...movies.all, ...results]
                            })
                        })
                    );
                }
            }).then(() => {
                if (sort) {
                    this.sortMovies();
                }
            })
            .catch(({ message }) => console.log('Error message: ', message));
    }
    _toggleTabs (tabName) {
        const { activeTab, movies } = this.state;

        if (tabName !== activeTab) {
            this.setState(() => ({
                activeTab: tabName,
                movies:    { ...movies }
            }));
        }
    }
    _sortMovies () {
        const { movies } = this.state;
        // !TODO: ANYTHING IS SORTED HERE
        const sortByLatest = (a, b) => {
            const aDate = new Date(a.release_date).getTime();
            const bDate = new Date(b.release_date).getTime();

            return bDate - aDate;
        };
        const sortByPopularity = (a, b) => b.popularity - a.popularity;
        const latest = movies.all.sort(sortByLatest);
        const popular = movies.all.sort(sortByPopularity);

        this.setState(() => ({
            activeTab: '',
            movies:    Object.assign({}, movies, {
                latest,
                popular
            })
        }));
    }
    _getFavourites () {
        let favourites = [];
        const { movies } = this.state;
        const isLocalStorageEmpty = localStorage.length === 0;
        const isLocalStorageFavouritesEmpty = localStorage.favourites
            ? localStorage.favourites.length === 0
            : false;

        if (!isLocalStorageEmpty && !isLocalStorageFavouritesEmpty) {
            favourites = localStorage.getItem('favourites').split(',');
        }
        this.setState(() =>
            Object.assign({}, this.state, {
                movies: Object.assign({}, movies, {
                    favourites
                })
            })
        );
    }
    _addToFavourites (id) {
        const { movies: { favourites }} = this.state;
        const _id = id.toString();
        const setOfFavourites = new Set(favourites);

        setOfFavourites.add(_id);
        localStorage.setItem('favourites', [...setOfFavourites]);
        this.getFavourites();
    }
    _deleteFromFavourites (id) {
        const { movies: { favourites }} = this.state;
        const _id = id.toString();
        const setOfFavourites = new Set(favourites);

        setOfFavourites.delete(_id);
        localStorage.setItem('favourites', [...setOfFavourites]);
        this.getFavourites();
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
            movies: {
                all,
                favourites,
                latest,
                popular
            }
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
    
        const setOfFavourites = new Set(favourites);
        const favouritesList = all.filter((movie) => {
            return setOfFavourites.has(`${movie.id}`);
        });
        
        //!TODO: WHY IS IT LOGGING 4 TIMES (ON EACH getMovies CALL IN COMPONENTWILLMOUNT METHOD???
        console.log('all', all);
        return (
            <div className = { Styles.homePage }>
                <Header
                    activeTab = { activeTab }
                    searchMovie = { this.searchMovie }
                    toggleTabs = { this.toggleTabs }
                />
                <main>
                    {/*!TODO: WHY DOESN'T Favourites GET ALL MOVIES???*/}
                    <Favourites movies = { favouritesList } />
                    <Home
                        addToFavourites = { this.addToFavourites }
                        deleteFromFavourites = { this.deleteFromFavourites }
                        favourites = { favourites }
                        movies = { moviesShown }
                    />
                </main>
            </div>
        );
    }
}
