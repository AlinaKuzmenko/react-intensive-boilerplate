// Core
import React, { Component } from 'react';
import { bool, string } from 'prop-types';

// Instruments
import star from '../../theme/assets/star.png';
import Styles from './styles.scss';


export default class Star extends Component {
    static propTypes = {
        isFavourite: bool.isRequired
    }
    static defaultProps = {
        isFavourite: false
    }
    constructor () {
        super();
        this.handleFavourites = :: this._handleFavourites;
    }
    state = {
        isFavourite: false
    }
    componentDidMount () {
        
    }
    _handleFavourites () {
        const { id, isFavourite } = this.props;
    
        if (!isFavourite) {
            console.log('is not in favourites');
            // localStorage.setItem('favourites', [...localStorage.getItem('favourites').split(','), ...[id]])
        } else {
            console.log('is in favourites');
        }
        
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
                onClick = { this.handleFavourites } />
        );
    }
}
