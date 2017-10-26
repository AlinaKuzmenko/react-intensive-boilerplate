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
        const { movie } = this.props;

        console.log('movie: ', movie);

        return (
            <section className = { Styles.moviePage }>
                <h2>{ movie.title }</h2>
                <img alt = { `${movie.title} movie poster` } src = { `${posterURL}/${movie.poster_path}` } />
            </section>
        );
    }
}
