import React, { useRef, useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
};

const GAP = 8;

const Carousel: React.FC<Props> = ({
  images,
  step = 3,
  frameSize = 3,
  itemWidth = 130,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [lastVisibleImgs, setLastVisibeImgs] = useState(step);

  const carouselWidth = itemWidth * frameSize + GAP * (frameSize - 1);

  const firstRemainder = lastVisibleImgs - step;
  const lastRemainder = images.length % step;

  const oneItemScrollWidth = itemWidth + GAP;
  const defaultScrollValue = oneItemScrollWidth * step;

  const wrapperRef = useRef<HTMLDivElement>(null);

  const scrollWithDelay = (value: number) => {
    setTimeout(() => {
      if (wrapperRef.current) {
        wrapperRef.current.scrollLeft += value;
      }
    }, animationDuration);
  };

  const prev = () => {
    if (wrapperRef.current && !infinite) {
      if (firstRemainder < step) {
        const currentScrollValue = -(oneItemScrollWidth * firstRemainder);

        scrollWithDelay(currentScrollValue);

        setLastVisibeImgs(step);
      } else {
        scrollWithDelay(-defaultScrollValue);

        setLastVisibeImgs(lastVisibleImgs - step);
      }
    }
  };

  const next = () => {
    if (wrapperRef.current && !infinite) {
      if (
        lastRemainder !== 0 &&
        images.length - lastVisibleImgs <= lastRemainder
      ) {
        const currentScrollValue = oneItemScrollWidth * lastRemainder;

        scrollWithDelay(currentScrollValue);

        setLastVisibeImgs(images.length);
      } else {
        scrollWithDelay(defaultScrollValue);

        setLastVisibeImgs(lastVisibleImgs + step);
      }
    }
  };

  return (
    <div className="Carousel" style={{ width: `${carouselWidth}px` }}>
      <div className="Carousel__wrapper" ref={wrapperRef}>
        <ul className="Carousel__list">
          {images.map((img, i) => (
            <li className="Carousel__img" key={i}>
              <img src={img} alt={`${i}`} width={itemWidth} className="img" />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__btns">
        <button
          type="button"
          className="prev"
          onClick={prev}
          disabled={lastVisibleImgs === 3}
        >
          {`<`}
        </button>
        <button
          type="button"
          className="next"
          onClick={next}
          disabled={lastVisibleImgs === 10}
          data-cy="next"
        >
          {`>`}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
