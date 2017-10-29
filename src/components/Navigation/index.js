// Core
import React, { Component } from 'react';
import { node } from 'prop-types';

// Instruments
import Styles from './styles.scss';

export default class Navigation extends Component {
    static propTypes = {
        children: node.isRequired
    }
    render () {
        const { children } = this.props;

        return (
            <nav className = { Styles.navigation }>
                { children }
            </nav>
        );
    }
}
