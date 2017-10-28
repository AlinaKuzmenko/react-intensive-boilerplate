// Core
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// Instruments
import Movie from './';
import defaultPoster from '../../theme/assets/default-poster.png';


Enzyme.configure({ adapter: new Adapter() });

const defaultProps = {
    id: 0,
    name: 'Movie name',
    poster: defaultPoster,
    releaseDate: '',
    votes: '0'
};
const props = {
    id: 550,
    name: 'Fight Club',
    poster: `https://image.tmdb.org/t/p/w500/adw6Lq9FiC9zjYEpOqfq03ituwp.jpg`,
    releaseDate: '15.10.1999',
    votes: 777
};
const movie = mount(
    <Movie />
);

describe('Movie component', () => {
    test('Should have an \'a\' element', () => {
        expect(movie.find('a')).toHaveLength(1);
    });
    
    test('Should have a \'figure\' element', () => {
        expect(movie.find('figure')).toHaveLength(1);
    });
    
    test('Should have an \'img\' element inside the \'figure\'', () => {
        expect(movie.find('figure').find('img')).toHaveLength(1);
    });
    
    test('Should have a \'figcaption\' element inside the \'figure\'', () => {
        expect(movie.find('figure').find('figcaption')).toHaveLength(1);
    });
    
    test('Should have an \'h3\' element inside the \'figcaption\'', () => {
        expect(movie.find('figcaption').find('h3')).toHaveLength(1);
    });
    
    test('Should have two \'span\' elements inside the \'figcaption\'', () => {
        expect(movie.find('figcaption').find('span')).toHaveLength(2);
    });
    
    test('Should have props that are passed', () => {
        movie.setProps({ props });
        expect(movie.props().props).toEqual(props);
    });
    
    test('Should have a name with the value from the passed props', () => {
        movie.setProps({ props });
        expect(movie.props().props).toEqual(props);
    });
    
    test('Should have a default text in \'h3\' if props not passed', () => {
        expect(movie.find('h3').text()).toBe(defaultProps.name);
    });
});
