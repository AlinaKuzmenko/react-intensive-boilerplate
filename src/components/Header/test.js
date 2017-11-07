// Core
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


// Instruments
import Header from './';


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

const activeTab = '';


const header = mount(
    <Header
        activeTab = { activeTab }
        sortByLatest = {() => null}
        sortByPopularity = {() => null}
    />
);

describe('Header component', () => {
    test('Should have a valid initial state', () => {
        expect(header.state()).toEqual(state);
    });
    
    test('Should have one \'header\' element', () => {
        expect(header.find('header')).toHaveLength(1);
    });

    test('Should have one \'h1\' element', () => {
        expect(header.find('h1')).toHaveLength(1);
    });

    test('Should have \'h1\' tag with one \'a\' element', () => {
        expect(header.find('h1 a')).toHaveLength(1);
    });
    
    test('Should have one \'nav\' element', () => {
        expect(header.find('nav')).toHaveLength(1);
    })
});
