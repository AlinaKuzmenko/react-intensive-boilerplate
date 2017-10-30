// Core
import React, { Component } from 'react';
import { number, object, string } from 'prop-types';

// Instruments
import Styles from './styles.scss';


export default class Modal extends Component {
    static contextTypes = {
        posterURL: string.isRequired
    }
    static propTypes = {
        movie: object,
        scrollTop: number
    }
    static defaultProps = {
        movie: {
            original_title: '',
            overview: 'No overview',
        },
        scrollTop: 0
    }
    constructor () {
        super();
        this.handleModal = ::this._handleModal;
    }
    componentDidMount () {
        const { movie: { id }, scrollTop } = this.props;
        const modal = document.getElementById(`modal-${id}`);
        // document.body.style.overflow = 'hidden';
        console.log('modal ', modal);
        modal.style.top = window.scrollY + 200 +  'px';
        modal.style.left = (window.innerWidth / 2) - (modal.scrollWidth / 2) +  'px';
    }
    componentWillUnmount () {
        // document.body.style.overflow = 'scroll';
    }
    _handleModal() {
        event.preventDefault();
        const { handleModal } = this.props;
        handleModal(event);
    }
    render () {
        const { posterURL } = this.context;
        const {
            scrollTop,
            movie: {
                id,
                original_title: title,
                overview,
                poster_path: poster,
                release_date: releaseDate,
                popularity,
                vote_count: votes
            }
        } = this.props;
        const src = `${posterURL}${poster}`;
    
        return (
            <section id = { `modal-${id}` } className = { Styles.modal }>
                <header>
                    <h2>{ title }</h2>
                    <span
                        className = { Styles.close }
                        onClick = { this.handleModal }
                    >
                        X
                    </span>
                </header>
                <div className = { Styles.details }>
                    <img
                        alt = { `${title} poster` }
                        src = { src }
                    />
                    <div className = { Styles.info }>
                        <p>
                            <mark>original title:</mark>
                            <span>{ title }</span>
                        </p>
                        <p>
                            <mark>release date:</mark>
                            <span>{ releaseDate }</span>
                        </p>
                        <p>
                            <mark>popularity:</mark>
                            <span>{ popularity }</span>
                        </p>
                        <p>
                            <mark>votes:</mark>
                            <span>{ votes }</span>
                        </p>
                        <p>
                            <mark>overview:</mark>
                            <span>{ overview }</span>
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}
