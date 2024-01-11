import React from 'react'
import { render } from '@testing-library/react'
import Card from './Card'

test('smoke test of Card', () => {
    render(<Card />)
})

// snapshot test of Card
it("matches snapshot", function() {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  });