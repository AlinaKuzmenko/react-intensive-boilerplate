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
    constructor () {
        super();
        this.handleQueryChange = ::this._handleQueryChange;
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        query: 'Search...'
    }
    _searchMovie (event) {
        const { query } = this.state;
        const { searchMovie } = this.props;

        event.preventDefault();
        if (!query) {

            return null;
        }
        searchMovie(query);
        this.textInput.value = '';
        this.setState(() => ({
            query: 'Search...'
        }));
    }
    _handleQueryChange (event) {
        const query = event.target.value;

        this.setState(() => ({ query }));
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
                        ref = { (input) => {
                            this.textInput = input;
                        } }
                        type = 'text'
                        onChange = { this.handleQueryChange }
                    />
                    <input
                        type = 'submit'
                        value = 'Search'
                    />
                </form>
            </header>
        );
    }
}
