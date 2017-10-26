// Core
import React, { Component } from 'react';
import { array } from 'prop-types';
import { Switch, Route } from 'react-router-dom';

// Instruments
import Home from '../Home';
import MoviePage from '../MoviePage';
import Styles from './styles';

export default class Content extends Component {
    static propTypes= {
        movies: array
    }
    render () {
        const { movies } = this.props;

        return (
            <div className = { Styles.content }>
                <Switch>
                    <Route exact path = '/' >
                        <Home movies = { movies } />
                    </Route>
                    {
                        movies
                            ? <Route
                                path = '/:movieID'
                                render = { ({ match }) =>
                                    <MoviePage movie = { movies.find((movie) => movie.id === parseInt(match.params.movieID)) } /> }
                            />
                            : null
                    }
                </Switch>
            </div>
        );
    }
}
