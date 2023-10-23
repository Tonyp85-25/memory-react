import React from "react";
import {
  render,
  screen,
} from "@testing-library/react";
import Board  from './board';

describe('should render according to difficulty level',()=>{
    test('should render with 28 cards in easy level', () => {
        render(<Board difficulty={"easy"}/>)
        const cards = screen.getAllByRole('button')
        expect(cards).toHaveLength(28)

})
     test('should render with 32 cards in hard level', () => {
  render(<Board difficulty={"easy"}/>)
        const cards = screen.getAllByRole('button')
        expect(cards).toHaveLength(32)
})
})

