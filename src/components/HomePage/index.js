// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Header from '../../components/Header';
import Favourites from '../../components/Favourites';
import Content from '../../components/Content';
import Styles from './';
import { getMovies } from '../../helpers';


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
        this.toggleTabs = ::this._toggleTabs;
        this.sortByLatest = ::this._sortByLatest;
        this.sortByPopularity = ::this._sortByPopularity;
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
        this.getMovies(2);
        this.getFavourites();
    }
    async _getMovies (pagesNumber) {
        const { movies: { all }} = this.state;
    
        const movies = await getMovies(this.context, 2);
        console.log('movies', movies);
    
    }
    _toggleTabs (tabName) {
        const { activeTab } = this.state;

        if (tabName !== activeTab) {
            this.setState(({ movies }) => ({
                activeTab: tabName,
                movies:    { ...movies }
            }));
        }
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
        const favouritesList = all.filter((movie) => setOfFavourites.has(`${movie.id}`));

        return (
            <div className = { Styles.homePage }>
                <Header
                    activeTab = { activeTab }
                    searchMovie = { this.searchMovie }
                    toggleTabs = { this.toggleTabs }
                    sortByLatest = { this.sortByLatest }
                    sortByPopularity = { this.sortByPopularity }
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
