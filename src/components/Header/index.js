import React, { Component } from 'react';
import { func, string } from 'prop-types';

import A from './A';
import Styles from './styles.scss';


export default class Header extends Component {
    static propTypes= {
        activeTab:   string.isRequired,
        searchMovie: func.isRequired
    }
    constructor () {
        super();
        this.searchMovie = ::this._searchMovie;
    }
    state = {
        inputPlaceholder: 'Search ...',
        inputValue:       ''
    }
    _searchMovie (event) {
        const query = event.target.value;
        const { activeTab, searchMovie } = this.props;

        this.setState(() => ({
            inputValue: query
        }));
        searchMovie(query.trim().toLowerCase(), activeTab);
    }
    render () {
        const {
            inputPlaceholder,
            inputValue
        } = this.state;
        const { activeTab } = this.props;

        return (
            <header className = { Styles.header }>
                <h1>
                    <a
                        href = '/'
                        onClick = { (event) => event.preventDefault() }>
                        Moviesearcha
                    </a>
                </h1>
                <form onSubmit = { this.searchMovie } >
                    <input
                        placeholder = { inputPlaceholder }
                        type = 'text'
                        value = { inputValue }
                        onChange = { this.searchMovie }
                    />
                </form>
                <nav className = { Styles.navigation }>
                    <A
                        className = { activeTab === 'all' ? Styles.active : '' }
                        tabName = 'all'
                    >
                        all
                    </A>
                    <A
                        className = { activeTab === 'popular' ? Styles.active : '' }
                        tabName = 'popular'
                    >
                        popular
                    </A>
                    <A
                        className = { activeTab === 'latest' ? Styles.active : '' }
                        tabName = 'latest'
                    >
                        latest
                    </A>
                </nav>
            </header>
        );
    }
}
