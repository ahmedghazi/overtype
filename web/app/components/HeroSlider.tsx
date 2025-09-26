import React from "react";
import { SanityKeyed } from "sanity-codegen";
import { Figure } from "../types/schema";
import FigureComponent from "./ui/Figure";
import Slider from "./ui/slick-slider";
// import SliderCursorPrevNextText from "./ui/slick-slider/SliderCursorPrevNextText"

type Props = {
  input: Array<SanityKeyed<Figure>>;
};

const HeroSlider = ({ input }: Props) => {
  return (
    <section className='hero-slider px-xs md:px-md '>
      <div className='inner rounded'>
        {input.length > 1 && (
          <Slider
            settingsOverride={{
              autoplay: false,
              // speed: 5000,
              // prevArrow: <SliderCursorPrevNextText direction='prev' />,
              // nextArrow: <SliderCursorPrevNextText direction='next' />,
            }}>
            {input.map((item, i) => (
              <div className='item' key={i}>
                <FigureComponent
                  asset={item.image?.asset || null}
                  rounded={false}
                  width={2000}
                />
              </div>
            ))}
          </Slider>
        )}
        {input.length === 1 && (
          <FigureComponent asset={input[0].image?.asset || null} width={2000} />
        )}
      </div>
    </section>
  );
};

export default HeroSlider;
