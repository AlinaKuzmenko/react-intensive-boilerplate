import React, { Component } from 'react';
import { func, node, string } from 'prop-types';


export default class A extends Component {
    static contextTypes = {
        toggleTabs: func.isRequired
    }
    static propTypes = {
        children:  node.isRequired,
        className: string.isRequired,
        tabName:   string.isRequired,
        href:      string
    }
    constructor () {
        super();
        this.toggleTabs = ::this._toggleTabs;
    }
    _toggleTabs (event) {
        event.preventDefault();
        const { toggleTabs } = this.context;
        const { tabName } = this.props;
        toggleTabs(tabName);
    }
    render () {
        const { children, className, href } = this.props;

        return (
            <a
                className = { className }
                href = '/'
                onClick = { this.toggleTabs }>
                {children}
            </a>
        );
    }
}
