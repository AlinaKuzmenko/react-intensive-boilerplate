// Core
import React, { Component } from 'react';
import { bool, number, object } from 'prop-types';

// Instruments
import star from '../../theme/assets/star.png';
import Styles from './styles.scss';


export default class Star extends Component {
    static propTypes = {
        id:              number.isRequired,
        isFavourite:     bool.isRequired,
        setOfFavourites: object.isRequired
    }
    static defaultProps = {
        // isFavourite: false
    }
    constructor (props) {
        super(props);
        this.addToFavourites = :: this._addToFavourites;
        this.removeFromFavourites = :: this._removeFromFavourites;
    }
    state = {
        isFavourite: this.props.isFavourite
    }
    _addToFavourites () {
        const { isFavourite } = this.state;
        const { id, setOfFavourites } = this.props;

        setOfFavourites.add(id);
        localStorage.setItem('favourites', [...setOfFavourites]);
        this.setState(() => ({
            isFavourite: !isFavourite
        }));
    }
    _removeFromFavourites () {
        const { isFavourite } = this.state;
        const { id, setOfFavourites } = this.props;

        setOfFavourites.delete(`${id}`);
        localStorage.setItem('favourites', [...setOfFavourites]);
        this.setState(() => ({
            isFavourite: !isFavourite
        }));
    }
    render () {
        const { isFavourite } = this.state;
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
