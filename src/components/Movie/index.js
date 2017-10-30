// Core
import React, { Component } from 'react';
import { object, string } from 'prop-types';

// Instruments
import Modal from './Modal';
import Styles from './styles.scss';


export default class Movie extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        movie: object
    }
    static defaultProps = {
        movie: {
            original_title: '',
            overview: 'No overview'
        }
    }
    constructor () {
        super();
        this.handleModal = ::this._handleModal;
    }
    state = {
        modalIsOpened: false
    }
    componentDidMount () {
        const { modalIsOpened } = this.state;

        if (modalIsOpened) {
            window.onwheel.preventDefault(); // modern standard
            window.onmousewheel.preventDefault(); // older browsers, IE
            window.ontouchmove.preventDefault(); // mobile
            document.onkeydown.preventDefaultForScrollKeys();
        }
    }
    _handleModal (event) {
        event.preventDefault();

        this.setState(() => ({
            modalIsOpened: !this.state.modalIsOpened
        }));
    }
    render () {
        const { posterURL } = this.context;
        const { modalIsOpened } = this.state;
        const {
            movie: {
                id,
                original_title: title,
                poster_path: poster,
                release_date: releaseDate,
                popularity
            }
        } = this.props;
        const modal = modalIsOpened
            ? <Modal
                handleModal = { this.handleModal }
                movie = { this.props.movie }
            />
            : null;
        const src = `${posterURL}${poster}`;
        const date = releaseDate.split('-').reverse().join('-');

        return (
            <div
                className = { Styles.movie }
                id = { `movie-${id}` }>
                <a
                    href = '/'
                    onClick = { this.handleModal }>
                    <figure>
                        <img
                            alt = { `${title} poster` }
                            src = { src }
                        />
                        <figcaption>
                            <span className = { Styles.popularity }>{ `popularity: ${popularity}` }</span>
                            <span className = { Styles.date }>{ `Release date: ${date}` }</span>
                            <h3>{ title }</h3>
                        </figcaption>
                    </figure>
                </a>
                { modal }
            </div>
        );
    }
}
