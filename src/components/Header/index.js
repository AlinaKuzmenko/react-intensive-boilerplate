// Core
import React, { Component } from 'react';
import { func, string } from 'prop-types';

// Instruments
import Styles from './styles.scss';


export default class Header extends Component {
    static contextTypes = {
        toggleTabs: func.isRequired
    }
    static propTypes= {
        activeTab:        string.isRequired,
        searchMovie:      func.isRequired,
    }
    constructor () {
        super();
        this.searchMovie = ::this._searchMovie;
        this.toggleTabs = ::this._toggleTabs;
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
    _toggleTabs (event) {
        event.preventDefault();
        const { toggleTabs } = this.context;
        const tabName = event.target.innerHTML;

        toggleTabs(tabName);
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
                <nav className = { Styles.navigation }>
                    <a
                        className = { activeTab === 'all' ? Styles.active : '' }
                        href = '/'
                        onClick = { this.toggleTabs }>
                        all
                    </a>
                    <a
                        className = { activeTab === 'popular' ? Styles.active : '' }
                        href = '/'
                        onClick = { this.toggleTabs }>
                        popular
                    </a>
                    <a
                        className = { activeTab === 'latest' ? Styles.active : '' }
                        href = '/'
                        onClick = { this.toggleTabs }>
                        latest
                    </a>
                </nav>
            </header>
        );
    }
}
