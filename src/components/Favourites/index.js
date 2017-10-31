// Core
import React, { Component } from 'react';
import { array, string } from 'prop-types';

// Instruments
import { getUniqueID } from '../../helpers';
import Styles from './styles.scss';


export default class Favourites extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        movies: array.isRequired
    }
    static defaultProps = {
        movies: []
    }
    render () {
        console.log(window.localStorage);
        const { posterURL } = this.context;
        const { movies } = this.props;
        const moviesList = movies.length > 0
            ? movies.map(
                ({ poster_path, title }) => (
                    <li key = { getUniqueID(15) }>
                        <a href = '/:movieID'>
                            <img alt = '' src = { `${posterURL}/${poster_path}` } />
                            <span>{ title }</span>
                        </a>
                    </li>
                )
            )
            : <li>No movies</li>;

        return (
            <aside className = { Styles.favourites }>
                <header>Favourites</header>
                <ul>
                    { moviesList }
                </ul>
            </aside>
        );
    }
}
