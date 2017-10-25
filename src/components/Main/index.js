// Core
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Instruments
import Home from '../Home';
import Favourites from '../Favourites';
import MoviePage from '../MoviePage';
import Styles from './styles';

export default class Main extends Component {
    render () {
        const { results } = this.props.movies;
        return (
            <main className = { Styles.main }>
                <div className = { Styles.content }>
                    <Switch>
                        <Route exact path = '/' >
                            <Home movies = { results } />
                        </Route>
                        {
                            results
                            ? <Route
                                    path = '/:movieID'
                                    render = { ({ match }) =>
                                        <MoviePage movie = { results.find((movie) => movie.id === match.params.movieID) } />
                                    }
                            />
                            : null
                        }
                    </Switch>
                </div>
                <Favourites />
            </main>
        );
    }
}
