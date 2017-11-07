import React, { Component } from 'react';
import { func, string } from 'prop-types';

import A from './A';
import Styles from './styles.scss';


export default class Header extends Component {
    static propTypes= {
        activeTab:   string.isRequired,
    }
    constructor () {
        super();
    }
    state = {
        inputPlaceholder: 'Search ...',
        inputValue:       ''
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
                <nav className = { Styles.navigation }>
                    <A
                        className = { activeTab === 'all' ? Styles.active : '' }
                        tabName = 'all'
                    />
                    <A
                        className = { activeTab === 'popular' ? Styles.active : '' }
                        tabName = 'popular'
                    />
                    <A
                        className = { activeTab === 'latest' ? Styles.active : '' }
                        tabName = 'latest'
                    />
                </nav>
            </header>
        );
    }
}
