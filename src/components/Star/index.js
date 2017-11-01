// Core
import React, { Component } from 'react';
import { bool, number } from 'prop-types';

// Instruments
import star from '../../theme/assets/star.png';
import Styles from './styles.scss';


export default class Star extends Component {
    static propTypes = {
        id: number.isRequired,
        isFavourite: bool.isRequired
    }
    static defaultProps = {
        isFavourite: false
    }
    constructor () {
        super();
        this.addFavourites = :: this._addFavourites;
    }
    state = {
        isFavourite: false
    }
    componentDidMount () {
    }
    _addFavourites () {
        
    }
    render () {
        const { isFavourite } = this.props;
        const className = isFavourite
            ? 'starActive'
            : 'star';
       
        return (
            <img
                className = { Styles[className] }
                src = { star }
                onClick = { this.addFavourites }
            />
        );
    }
}
