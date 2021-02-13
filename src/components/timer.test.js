import React from 'react';
import {shallow} from 'enzyme';
import Timer from './timer'

const defaultProps ={}

const setup = (props ={})=>{
    const setupProps = {...defaultProps, ...props}
    return shallow(<Timer {...setupProps} />) 
}

test('renders without errors', () => {
    const wrapper = setup()
    const component  = wrapper.find('.timer')
    expect(component.length).toBe(1)
})
