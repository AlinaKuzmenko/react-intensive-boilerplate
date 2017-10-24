// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import poster from '../../theme/assets/default-poster.png';
import Styles from './styles.scss';


export default class Movie extends Component {
    static propTypes = {
        poster: string.isRequired,
        name: string.isRequired,
    }
    static defaultProps = {
      poster: poster,
      name: 'Movie name',
      description: 'There\'s no description for this movie yet',
    }
    render () {
        const { poster, name } = this.props;
        return (
            <figure className = { Styles.movie }>
                <img src = { poster } alt = { `${ name } poster` }/>
                <figcaption>{ name }</figcaption>
            </figure>
        );
    }
}
