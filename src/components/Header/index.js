// Core
import React, { Component } from 'react';
import { func } from 'prop-types';
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
    _searchMovie (event) {
        const query = event.target.value;
        const { searchMovie } = this.props;

        searchMovie(query.trim().toLowerCase());
    }
    _resetDefaultPlaceholder (event) {
        if (!event.target.value) {
            return null;
        }
        event.target.value = '';
        event.target.placeholder = 'Search ...';
    }
    render () {

        return (
            <header className = { Styles.header }>
                <h1>
                    <Link to = '/'>Moviesearcha</Link>
                </h1>
                <form onSubmit = { this.searchMovie } >
                    <input
                        placeholder = 'Search ...'
                        type = 'text'
                        onBlur = { this.resetDefaultPlaceholder }
                        onChange = { this.searchMovie }
                    />
                </form>
            </header>
        );
    }
}
