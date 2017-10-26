// Core
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { array, string } from 'prop-types';

// Instruments
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
        const { posterURL } = this.context;
        const { movies } = this.props;
        const moviesList = (movies.length > 0)
            ? movies.map(
                ({ poster_path, title }) => (
                    <li>
                        <Link to = '/:movieID'>
                            <img alt = '' src = {`${posterURL}/${poster_path}`} />
                            <span>{ title }</span>
                        </Link>
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
