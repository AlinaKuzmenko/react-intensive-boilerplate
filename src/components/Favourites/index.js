// Core
import React, { Component } from 'react';
import { array, string } from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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
                ({ id, poster_path: posterPath, title }) => ( // eslint-disable-line
                    <CSSTransition
                        classNames = {{
                            appear: Styles.liAppear,
                            appearActive: Styles.liAppearActive,
                            enter: Styles.liEnter,
                            enterActive: Styles.liEnterActive,
                            exit: Styles.liExit,
                            exitActive: Styles.liExitActive,
                        }}
                        key = { id }
                        timeout = {{
                            enter: 500,
                            exit: 500
                        }}
                    >
                        <li key = { getUniqueID(15) }>
                            <img alt = {`${title} poster`} src = { `${posterURL}/${posterPath}` } />
                            <span>{ title }</span>
                        </li>
                    </CSSTransition>
                )
            )
            : <li>No movies</li>;

        return (
            <aside className = { Styles.favourites }>
                <header>Favourites</header>
                <ul>
                    <TransitionGroup>
                        { moviesList }
                    </TransitionGroup>
                </ul>
            </aside>
        );
    }
}
