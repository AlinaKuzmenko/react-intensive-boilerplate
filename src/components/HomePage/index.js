// Core
import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { memoize } from 'lodash';

// Instruments
import Header from '../../components/Header';
import Favourites from '../../components/Favourites';
import Content from '../../components/Content';
import Styles from './';
import { getMovies } from '../../helpers';


export default class HomePage extends Component {
    static childContextTypes = {
        toggleTabs: func.isRequired
    }
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
        this.toggleTabs = ::this._toggleTabs;
        this.sortByLatest = ::this._sortByLatest;
        this.sortByPopularity = ::this._sortByPopularity;
    }
    state = {
        activeTab: 'all',
        movies:    {
            all:        [],
            favourites: new Set(),
            filtered:   [],
            latest:     [],
            popular:    []
        }
    }
    getChildContext () {
        return {
            toggleTabs: this.toggleTabs
        };
    }
    componentWillMount () {
        this.getMovies(1);
        this.getFavourites();
    }
    async _getMovies (pagesNumber) {
        const all = await getMovies(this.context, pagesNumber);

        this.setState(({ movies }) =>
            Object.assign({}, this.state, {
                movies: Object.assign({}, movies, {
                    all,
                    latest: this.sortByLatest(all),
                    popular: this.sortByPopularity(all)
                })
            })
        );
    }
    _toggleTabs (tabName) {
        const { activeTab } = this.state;

        if (tabName !== activeTab) {
            this.setState(({ movies }) => ({
                activeTab: tabName,
                movies
            }));
        }
    }
    _sortByLatest (movies) {
        const sortByDate = (a, b) => {
            const aDate = new Date(a.release_date).getTime();
            const bDate = new Date(b.release_date).getTime();

            return bDate - aDate;
        };

        return [...movies].sort(sortByDate);
    }
    _sortByPopularity (movies) {
        const sortByPopularity = (a, b) => b.popularity - a.popularity;

        return [...movies].sort(sortByPopularity);
    }
    _getFavourites () {
        let favourites = [];
        const isLocalStorageEmpty = localStorage.length === 0;
        const isLocalStorageFavouritesEmpty = localStorage.favourites
            ? localStorage.favourites.length === 0
            : false;

        if (!isLocalStorageEmpty && !isLocalStorageFavouritesEmpty) {
            favourites = localStorage.getItem('favourites').split(',');
        }
        this.setState(({ movies }) =>
            Object.assign({}, this.state, {
                movies: Object.assign({}, movies, {
                    favourites: movies.favourites.add([...favourites])
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
        const { movies: { all }} = this.state;
        let moviesFiltered = [];

        if (!query) {
            moviesFiltered = all;
            this.setState(({ movies }) => ({
                activeTab: '',
                movies:    { ...movies }
            }));
        }
        moviesFiltered = all.filter((movie) => {
            const title = movie.title.toLowerCase();

            return title.indexOf(query) !== -1;
        });
        this.setState(({ movies }) =>
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
            case 'all':
                moviesShown = all;
                break;
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
        
        const favouritesList = all.filter((movie) => {
            console.log(movie.id);
            console.log(favourites.has(`${movie.id}`));
            return favourites.has(`${movie.id}`);
        });
        console.log('SET favourites', favourites);
        console.log(movies);
        return (
            <div className = { Styles.homePage }>
                <Header
                    activeTab = { activeTab }
                    searchMovie = { this.searchMovie }
                    toggleTabs = { this.toggleTabs }
                />
                <main>
                    <Favourites movies = { favouritesList } />
                    <Content
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
