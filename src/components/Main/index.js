// Core
import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// Instruments
import Home from '../Home';
import Favourites from '../Favourites';
import Movie from '../Movie';
import Styles from './styles';

export default class Main extends Component {
    render () {
        const { movies } = this.props;
        
        return (
            <main className = { Styles.main }>
                <div className = { Styles.content }>
                    <Switch>
                        <Route path = '/' >
                          <Home movies = { movies } />
                        </Route>
                      <Route path = '/:movieID'>
                        <Movie />
                      </Route>
                    </Switch>
                </div>
                <Favourites />
            </main>
        );
    }
}
