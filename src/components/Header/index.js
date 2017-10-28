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
    }
    _searchMovie (event) {
        const query = event.target.value;
        const { searchMovie } = this.props;

        searchMovie(query.trim().toLowerCase());
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
                        onChange = { this.searchMovie }
                    />
                </form>
            </header>
        );
    }
}
