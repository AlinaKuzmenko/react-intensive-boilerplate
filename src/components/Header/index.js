// Core
import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { Link } from 'react-router-dom';

// Instruments
import Styles from './styles.scss';


export default class Header extends Component {
    static propTypes= {
        searchMovie: func.isRequired
    }
    constructor (props) {
        super(props);
        this.searchMovie = ::this._searchMovie;
        this.resetDefaultPlaceholder = ::this._resetDefaultPlaceholder;
    }
    state = {
        query: 'Search...',
    }
    _searchMovie (event) {
        event.preventDefault();
        const query = event.target.value;
        const { searchMovie } = this.props;

        this.setState(() => ({ query }));
        if (!query) {

            return null;
        }
        searchMovie(query.trim().toLowerCase());
    }
    _resetDefaultPlaceholder (event) {
        if (!event.target.value) {
            return null;
        }
        event.target.value = '';
        this.setState(() => ({
            query: 'Search ...'
        }));
    }
    render () {
        const { query } = this.state;

        return (
            <header className = { Styles.header }>
                <h1>
                    <Link to = '/'>Moviesearcha</Link>
                </h1>
                <form onSubmit = { this.searchMovie } >
                    <input
                        placeholder = { query }
                        type = 'text'
                        onChange = { this.searchMovie }
                        onBlur = { this.resetDefaultPlaceholder }
                    />
                </form>
            </header>
        );
    }
}
