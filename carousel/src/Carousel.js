import { useState } from "react";
import "./Carousel.css";
import Card from "./Card";


/** Carousel: displays images and arrows to navigate through them
 * 
 * Props:
 * - photos: array of {src, caption} objects
 * - title: string describing the collection of images
 * 
 * State:
 * - currCardIdx: integer for current card index
 * 
 * App --> Carousel --> Card
 */
 function Carousel({ photos, title }) {
  const [currCardIdx, setCurrCardIdx] = useState(0);

  const currCard = photos[currCardIdx];
  const total = photos.length;

  //Increments currCardIdx state by 1. Fixed so that currCardIdx does not go beyond total.  
  function goForward() {
    setCurrCardIdx((currCardIdx + 1) % total);
  }

  // Decreases increment of currCardIdx state by 1 and makes sure that number does not select to a nonexistent photo. 
  function goBackward() {
    setCurrCardIdx((currCardIdx - 1 + total) % total);
  }

  // Check if the current card is at the beginning or end to conditionally render arrows
  const showLeftArrow = currCardIdx > 0;
  const showRightArrow = currCardIdx < total - 1;

  return (
    <div className="Carousel">
      <h1>{title}</h1>
      <div className="Carousel-main">
      {showLeftArrow && (
          <i className="bi bi-arrow-left-circle" onClick={goBackward} />
        )}
        <Card
          caption={currCard.caption}
          src={currCard.src}
          currNum={currCardIdx + 1}
          totalNum={total}
        />
        {showRightArrow && (
          <i className="bi bi-arrow-right-circle" onClick={goForward} />
        )}
      </div>
    </div>
  );
}

export default Carousel;
