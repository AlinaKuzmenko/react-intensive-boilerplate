// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.scss';
import TweenMax from 'gsap';
import Transition from 'react-transition-group/Transition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

// Components
import Composer from '../../components/Composer';
import Post from '../../components/Post';
import Counter from '../../components/Counter';
import Postman from '../../components/Postman';

export default class Feed extends Component {
    state = {
        posts:      [],
        postsCount: 0
    };

    createPost = (message) => {
        this.setState({
            posts: this.state.posts.concat(message)
        });
    };

    deletePost = (index) => {
        this.setState({
            posts: this.state.posts.filter((item, ind) => ind !== index)
        });
    };

    increasePostsCount = () => {
        this.setState({
            postsCount: this.state.postsCount + 1
        });
    };

    decreasePostsCount = () => {
        this.setState({
            postsCount: this.state.postsCount - 1
        });
    };

    handleComposerAppear = () => {
        TweenMax.fromTo(this.composer, 1.2, { y: -200 }, { y: 0 });
    };

    handleCounterAppear = () => {
        TweenMax.fromTo(this.counter, 1.2, { opacity: 0 }, { opacity: 1 });
    };

    handlePostmanAppear = () => {
        new Promise((resolve) => {
            TweenMax.fromTo(
                this.postman,
                1.5,
                { opacity: 0 },
                {
                    opacity:    1,
                    onComplete: () => setTimeout(() => resolve(), 4000)
                }
            );
        }).then(() =>
            TweenMax.fromTo(this.postman, 1.5, { opacity: 1 }, { opacity: 0 })
        );
    };

    handlePostEnter = () => {
        TweenMax.fromTo(this.post, 0.5, { opacity: 0 }, { opacity: 1 });
    };

    handlePostExit = () => {
        TweenMax.fromTo(this.post, 0.5, { y: 0 }, { y: 1000 });
    }

    render () {
        const posts = this.state.posts.map((message, key) =>
            (<Transition
                in
                key = { key }
                timeout = { 500 }
                onEnter = { this.handlePostEnter }
                onExit = { this.handlePostExit }>
                <div ref = { (post) => this.post = post }>
                    <Post
                        decreasePostsCount = { this.decreasePostsCount }
                        deletePost = { this.deletePost }
                        increasePostsCount = { this.increasePostsCount }
                        index = { key }
                        message = { message }
                    />
                </div>
            </Transition>)
        );

        return (
            <section className = { Styles.feed }>
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handleComposerAppear }>
                    <div ref = { (composer) => this.composer = composer }>
                        <Composer createPost = { this.createPost } />
                    </div>
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handleCounterAppear }>
                    <div ref = { (counter) => this.counter = counter }>
                        <Counter count = { this.state.postsCount } />
                    </div>
                </Transition>
                <TransitionGroup>
                    {posts}
                </TransitionGroup>
                <Transition
                    appear
                    in
                    timeout = { 500 }
                    onEnter = { this.handlePostmanAppear }>
                    <div ref = { (postman) => this.postman = postman }>
                        <Postman />
                    </div>
                </Transition>
            </section>
        );
    }
}
