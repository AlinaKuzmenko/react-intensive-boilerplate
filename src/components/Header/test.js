// Core
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Instruments
import Header from './index';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

const query = 'Star Wars';
const state = {
        inputPlaceholder: 'Search ...',
        inputValue: ''
    };
const mutatedState = {
        inputPlaceholder: 'Search ...',
        inputValue: query
    };
const location = {
        hash: "/",
        key: "bwooxy",
        pathname: "/",
        search: "",
        state
    };
const header = mount(
        <MemoryRouter initialEntries = { [location] }>
            <Header searchMovie = {() => null} />
        </MemoryRouter>
    );

describe('Header component', () => {
    test('Should have one \'header\' element', () => {
        expect(header.find('header')).toHaveLength(1);
    });

    test('Should have one \'h1\' element', () => {
        expect(header.find('h1')).toHaveLength(1);
    });

    test('Should have \'h1\' tag with one \'a\' element', () => {
        expect(header.find('h1').find('a')).toHaveLength(1);
    });

    test('Should have one \'form\' element', () => {
        expect(header.find('form')).toHaveLength(1);
    });

    test('Should have a \'form\' element with one \'input\' element', () => {
        expect(header.find('form').find('input')).toHaveLength(1);
    });

    test('Should have a valid initial state', () => {
        expect(header.state()).toEqual(state);
    });

    test('Should get an initial state on blur', () => {
        header.setState(() => (mutatedState));
        header.find('input').simulate('blur');
        expect(header.state()).toEqual(state);
    });
    
    test('Should respond to input change', () => {
        header.find('input').simulate('change', {
            target: {
                value: query
            }
        });
        expect(header.state()).toEqual(mutatedState);
        console.log(header.find('input').text());
    });
    
    test('Shouldn\'t do anything if the query is an empty string', () => {
        header.find('input').simulate('change', {
            target: {
                value: ''
            }
        });
        
    });
});
