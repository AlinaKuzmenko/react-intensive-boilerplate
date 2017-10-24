// Core
import React, { Component } from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';

// Instruments
import defaultPoster from '../../theme/assets/default-poster.png';
import Styles from './styles.scss';


const posterURL = `https://image.tmdb.org/t/p/w500`;

export default class Movie extends Component {
    static propTypes = {
        id: number.isRequired,
        name: string.isRequired,
        overview: string.isRequired,
        poster: string.isRequired,
        votes: number.isRequired,
    }
    static defaultProps = {
        id: 0,
        name: 'Movie name',
        overview: 'There\'s no overview for this movie yet',
        poster: defaultPoster,
        votes: 0
    }
    render () {
        const { id, name, overview, poster, votes } = this.props;
        const src = poster ? `${ posterURL }/${ poster }` : defaultPoster;
        return (
            <figure className = { Styles.movie }>
                <Link to = { `/${ id }` }>
                    <img src = { src } alt = { `${ name } poster` }/>
                    <figcaption>
                        <h3>{ name }</h3>
                        <p>{ overview }</p>
                        <span>{ `Votes: ${ votes }` }</span>
                    </figcaption>
                </Link>
            </figure>
        );
    }
}
