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
    componentWillMount () {
        
    }
    _handleFavourites () {
        console.log('handleFavourites');
        
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
