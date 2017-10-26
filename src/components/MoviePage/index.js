// Core
import React, { Component } from 'react';
import { object, string } from 'prop-types';

// Instruments
import Styles from './styles.scss';


export default class MoviePage extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        movie: object
    }
    static defaultProps = {
        original_language: '',
        overview: '',
        popularity: '',
        poster_path: '',
        release_date: '',
        vote_average: '',
        title: 'No title yet'
    }
    render () {
        const { posterURL } = this.context;
        const { movie: {
            original_language,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            vote_average
        }} = this.props;

        return (
            <section className = { Styles.moviePage }>
                <h2>{ title }</h2>
                <img alt = { `${title} movie poster` } src = { `${posterURL}/${poster_path}` } />
                <div className = { Styles.details }>
                    <p><b>Original language:</b> { original_language }</p>
                    <p><b>Popularity:</b> { popularity }</p>
                    <p><b>Release date:</b> { release_date }</p>
                    <p><b>Vote Average:</b> { vote_average }</p>
                </div>
                <section className = { Styles.overview }>
                    <h5>Overview</h5>
                    <p>{ overview }</p>
                </section>
            </section>
        );
    }
}
