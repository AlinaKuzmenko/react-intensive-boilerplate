// Core
import React, { Component } from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles.scss';


export default class MoviePage extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        poster_path: string,
        title: string
    }
    static defaultProps = {
        poster_path: '',
        title: 'No title yet'
    }
    render () {
        const { posterURL } = this.context;
        const { movie: {
            title,
            poster_path,
            original_language,
            overview,
            popularity,
            release_date,
            vote_average,
        } } = this.props;

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
