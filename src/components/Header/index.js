// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

// Instruments
import Navigation from '../Navigation';
import Styles from './styles.scss';


export default class Header extends Component {
    static propTypes= {
        searchMovie: func.isRequired,
        sortByLatest: func.isRequired,
        sortByPopularity: func.isRequired
    }
    constructor (props) {
        super(props);
        this.searchMovie = ::this._searchMovie;
        this.sortByLatest = ::this._sortByLatest;
        this.sortByPopularity = ::this._sortByPopularity;
    }
    state = {
        inputPlaceholder: 'Search ...',
        inputValue: ''
    }
    _searchMovie (event) {
        const query = event.target.value;
        const { searchMovie } = this.props;

        this.setState(() => ({
            inputValue: query
        }));
        searchMovie(query.trim().toLowerCase());
    }
    _sortByLatest (event) {
        event.preventDefault();
        const { sortByLatest } = this.props;

        sortByLatest();
    }
    _sortByPopularity (event) {
        event.preventDefault();
        const { sortByPopularity } = this.props;

        sortByPopularity();
    }
    render () {
        const { inputPlaceholder, inputValue } = this.state;

        return (
            <header className = { Styles.header }>
                <h1>
                    <a href = '/'>Moviesearcha</a>
                </h1>
                <form onSubmit = { this.searchMovie } >
                    <input
                        placeholder = { inputPlaceholder }
                        type = 'text'
                        value = { inputValue }
                        onChange = { this.searchMovie }
                    />
                </form>
                <Navigation>
                    <a href = '/' onClick = { this.sortByPopularity }>Popular</a>
                    <a href = '/' onClick = { this.sortByLatest }>Latest</a>
                </Navigation>
            </header>
        );
    }
}
