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
        favourites: array.isRequired,
        movies:     array.isRequired
    }
    static defaultProps = {
        favourites: [],
        movies:     []
    }
    render () {
        const { posterURL } = this.context;
        const { movies } = this.props;
        const moviesList = movies.length > 0
            ? movies.map(
                ({ poster_path: posterPath, title }) => ( // eslint-disable-line
                    <li key = { getUniqueID(15) }>
                        <img alt = '' src = { `${posterURL}/${posterPath}` } />
                        <span>{ title }</span>
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
