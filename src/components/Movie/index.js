// Core
import React, { Component } from 'react';
import { string, number } from 'prop-types';
import { Link } from 'react-router-dom';

// Instruments
import defaultPoster from '../../theme/assets/default-poster.png';
import Styles from './styles.scss';


export default class Movie extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        id: number.isRequired,
        name: string.isRequired,
        votes: number.isRequired,
        poster: string,
        releaseDate: string
    }
    static defaultProps = {
        id: 0,
        name: 'Movie name',
        poster: defaultPoster,
        votes: 0
    }
    render () {
        const { posterURL } = this.context;
        const { id, name, poster, releaseDate, votes } = this.props;
        const src = poster ? `${posterURL}/${poster}` : defaultPoster;

        return (
            <Link
                className = { Styles.movie }
                to = { `/${id}` } >
                <figure>
                    <img alt = { `${name} poster` } src = { src } />
                    <figcaption>
                        <h3>{ name }</h3>
                        <span className = { Styles.votes }>{ `Votes: ${votes}` }</span>
                        <span className = { Styles.date }>{ releaseDate }</span>
                    </figcaption>
                </figure>
            </Link>

        );
    }
}
