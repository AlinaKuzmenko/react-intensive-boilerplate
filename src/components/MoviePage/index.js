// Core
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

// Instruments
import Styles from './styles.scss';


export default class MoviePage extends Component {
    static contextTypes = {
        posterURL: PropTypes.string
    }
    // static propTypes = {
    //     adult: PropTypes.bool,
    //     backdrop_path: PropTypes.string,
    //     genre_ids: PropTypes.array,
    //     id: PropTypes.number,
    //     original_language: PropTypes.string,
    //     original_title: PropTypes.string,
    //     overview: PropTypes.string,
    //     popularity: PropTypes.number,
    //     poster_path: PropTypes.string,
    //     release_date: PropTypes.string,
    //     title: PropTypes.string.isRequired,
    //     video: PropTypes.bool,
    //     vote_average: PropTypes.number,
    //     vote_count: PropTypes.number
    // }
    // static defaultProps = {
    //     adult: false,
    //     backdrop_path: '',
    //     genre_ids: [],
    //     id: 0,
    //     original_language: '',
    //     original_title: '',
    //     overview: '',
    //     popularity: 0,
    //     poster_path: '',
    //     release_date: '',
    //     title: '',
    //     video: false,
    //     vote_average: 0,
    //     vote_count: 0
    // }
    
    render () {
        const { posterURL } = this.context;
        const {
            adult,
            backdrop_path,
            genre_ids,
            id,
            original_language,
            original_title,
            overview,
            popularity,
            poster_path,
            release_date,
            title,
            video,
            vote_average,
            vote_count
        } = this.props;
        return (
            <section className = { Styles.moviePage }>
                <h2>{ title }</h2>
                <img src = { `${ posterURL }/${ poster_path }` } alt = { `${ title } movie poster` }/>
            </section>
        );
    }
}
