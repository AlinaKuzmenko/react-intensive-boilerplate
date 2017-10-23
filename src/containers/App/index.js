// Core
import React, { Component } from 'react';

// Instruments
import Header from '../../components/Header';
import Main from '../../components/Main';


export default class App extends Component {
    constructor () {
        super();
        this.getAllMovies = ::this._getAllMovies;
    }
    state = {
        movies: []
    }
    componentDidMount () {
        this.getAllMovies();
    }
    _getAllMovies () {
        console.log('getting all movies');
    }
    render () {
        return (
            <div>
                <Header />
                <Main />
            </div>
        );
    }
}
