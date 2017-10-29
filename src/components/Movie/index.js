// Core
import React, { Component } from 'react';
import { object, string } from 'prop-types';

// Instruments
import defaultPoster from '../../theme/assets/default-poster.png';
import Styles from './styles.scss';


export default class Movie extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        movie: object
    }
    static defaultProps = {
        
    }
    render () {
        const { posterURL } = this.context;
        const {
            movie: {
                id,
                genre_ids: genreIDs,
                original_title: title,
                overview,
                poster_path: poster,
                release_date: releaseDate,
                popularity,
                vote_count: votes
            }
        } = this.props;
        console.log('this.props.movie', this.props.movie);
        const src = poster ? `${posterURL}/${poster}` : defaultPoster;
        const date = releaseDate.split('-').reverse().join('-');

        return (
            <a
                className = { Styles.movie }
                href = { `/${id}` } >
                <figure>
                    <img alt = { `${title} poster` } src = { src } />
                    <figcaption>
                        <span className = { Styles.popularity }>{ `popularity: ${popularity}` }</span>
                        <span className = { Styles.date }>{ `Release date: ${date}` }</span>
                        <h3>{ title }</h3>
                    </figcaption>
                </figure>
            </a>

        );
    }
}
