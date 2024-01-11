import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

test('smoke test of Carousel', () => {
  render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing"
  />);
});

// snapshot test of Carousel
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel 
    photos={TEST_IMAGES}
    title="images for testing"
  />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the third
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // move backward in the carousel to end up on first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

test('left arrow button disappears when on first image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  const leftArrow = container.querySelector(".bi-arrow-left-circle");

  expect(leftArrow).not.toBeInTheDocument();
});

test('right arrow button disappears when on last image', () => {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  // move forward in the carousel to end up at 2nd image
  let rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  // move forward in the carousel to end up at last image
  rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  
  rightArrow = container.querySelector(".bi-arrow-right-circle");

  expect(rightArrow).not.toBeInTheDocument();
});
