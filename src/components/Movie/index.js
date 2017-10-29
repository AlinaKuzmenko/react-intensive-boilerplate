// Core
import React, { Component } from 'react';
import { string, number } from 'prop-types';

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
        popularity: number,
        poster: string,
        releaseDate: string
    }
    static defaultProps = {
        id: 0,
        name: 'Movie name',
        popularity: 'unknown',
        poster: defaultPoster,
        releaseDate: 'unknown',
        votes: '0'
    }
    render () {
        const { posterURL } = this.context;
        const {
            id,
            name,
            poster,
            releaseDate,
            votes,
            popularity
        } = this.props;
        const src = poster ? `${posterURL}/${poster}` : defaultPoster;
        const date = releaseDate.split('-').reverse().join('-');

        return (
            <a
                className = { Styles.movie }
                href = { `/${id}` } >
                <figure>
                    <p>{ popularity }</p>
                    <img alt = { `${name} poster` } src = { src } />
                    <figcaption>
                        <h3>{ name }</h3>
                        <span className = { Styles.votes }>{ `Votes: ${votes}` }</span>
                        <span className = { Styles.date }>{ date }</span>
                    </figcaption>
                </figure>
            </a>

        );
    }
}
