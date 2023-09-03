import { useEffect, useState, useRef } from 'react';

import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import styled from 'styled-components';

import './styles.css';
import { CardProps } from '../../types/props';
import { supabaseStorageUrl } from '../../api/supabase';

const heights = [300, 550, 450, 330, 600, 720];

function getRandomElement(arr: number[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

const Card = (props: CardProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const observerRef = useRef(null);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    }
  });

  const { title, images, location, period_start, period_end, isClosed } = props.store;
  const [isHovered, setIsHovered] = useState(false);
  const [cardHeight, setCardHeight] = useState<number>(0);

  useEffect(() => {
    setCardHeight(getRandomElement(heights));
  }, []);

  return (
    <>
      {isClosed ? (
        <CardContainerClosed
          ref={sliderRef}
          className="keen-slider"
          style={{ height: cardHeight }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          {images.map((image) => (
            <img src={`${supabaseStorageUrl}/${image}`} className="keen-slider__slide" key={image} />
          ))}
          <CLosed>CLOSED</CLosed>

          {isHovered && (
            <StoreInfo>
              <div>CLSOED</div>
              <div>{title}</div>
              <div>{location}</div>
              <div>{`${period_start} ~ ${period_end}`}</div>
            </StoreInfo>
          )}
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e: any) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              />
            </>
          )}
        </CardContainerClosed>
      ) : (
        <CardContainer
          ref={sliderRef}
          className="keen-slider"
          style={{ height: cardHeight }}
          onMouseOver={() => setIsHovered(true)}
          onMouseOut={() => setIsHovered(false)}
        >
          {images.map((image) => (
            <img src={`${supabaseStorageUrl}/${image}`} className="keen-slider__slide" key={image} />
          ))}
          {isHovered && (
            <StoreInfo>
              <div>{title}</div>
              <div>{location}</div>
              <div>{`${period_start} ~ ${period_end}`}</div>
            </StoreInfo>
          )}
          {loaded && instanceRef.current && (
            <>
              <Arrow
                left
                onClick={(e: any) => {
                  e.stopPropagation();
                  instanceRef.current?.prev();
                }}
                disabled={currentSlide === 0}
              />

              <Arrow
                onClick={(e: any) => {
                  e.stopPropagation();
                  instanceRef.current?.next();
                }}
                disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
              />
            </>
          )}
        </CardContainer>
      )}
    </>
  );
};

export default Card;

const CardContainerClosed = styled.div`
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  border-radius: 18px;
  filter: grayscale(100%); /* 이미지를 흑백으로 만듭니다. */
  transition: filter 0.3s ease; /* 효과를 부드럽게 적용합니다. */
  /* margin: 0 auto; */

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const CLosed = styled.div`
  position: absolute;
  /* top: 46.3%;
  left: 35%; */

  font-size: 40px;
  font-weight: bold;
  color: white;
`;

const CardContainer = styled.div`
  position: relative;
  border-radius: 7px;
  overflow: hidden;
  border-radius: 18px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

const StoreInfo = styled.div`
  position: absolute;
  top: 70%;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
`;

const Arrow = (props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) => {
  const disabeld = props.disabled ? ' arrow--disabled' : '';
  const zIndex = 4;
  return (
    <svg
      onClick={props.onClick}
      style={{ zIndex }}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabeld}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
      {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};
