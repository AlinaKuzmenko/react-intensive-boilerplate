// Core
import React, { Component } from 'react';
import { func } from 'prop-types';

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
    _resetDefaultPlaceholder (event) {
        const { searchMovie } = this.props;

        if (!event.target.value) {
            return null;
        }
        this.setState(() => ({
            inputValue: ''
        }));
        searchMovie('');
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
                        onBlur = { this.resetDefaultPlaceholder }
                        onChange = { this.searchMovie }
                    />
                </form>
            </header>
        );
    }
}
