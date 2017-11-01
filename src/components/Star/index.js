// Core
import React, { Component } from 'react';
import { bool, number, object } from 'prop-types';

// Instruments
import star from '../../theme/assets/star.png';
import Styles from './styles.scss';


export default class Star extends Component {
    static propTypes = {
        id: number.isRequired,
        isFavourite: bool.isRequired,
        setOfFavourites: object.isRequired,
    }
    static defaultProps = {
        // isFavourite: false
    }
    constructor () {
        super();
        this.addToFavourites = :: this._addToFavourites;
        this.removeFromFavourites = :: this._removeFromFavourites;
    }
    _addToFavourites () {
        const { id, setOfFavourites } = this.props;
        setOfFavourites.add(id);
        localStorage.setItem('favourites', [...setOfFavourites]);
        console.log(`${id} addToFavourites`);
    }
    _removeFromFavourites () {
        const { id, setOfFavourites } = this.props;
        setOfFavourites.delete(`${id}`);
        localStorage.setItem('favourites', [...setOfFavourites]);
        console.log(`${id} removeFromFavourites`);
    }
    render () {
        const { isFavourite } = this.props;
        const className = isFavourite
            ? 'starActive'
            : 'star';
        const handleFavourites = isFavourite
            ? this.removeFromFavourites
            : this.addToFavourites;
       
        return (
            <img
                className = { Styles[className] }
                src = { star }
                onClick = { handleFavourites }
            />
        );
    }
}
