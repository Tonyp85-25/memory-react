import React from 'react';
import {shallow} from 'enzyme';
import { Board } from './board';

const defaultProps ={}

const setup = (props ={})=>{
    const setupProps = {...defaultProps, ...props}
    return shallow(<Board {...setupProps} />) 
}

test('should render without error', () => {
    const wrapper = setup()
    const board = wrapper.find('.board')
    expect(board.length).toBe(1)
})
