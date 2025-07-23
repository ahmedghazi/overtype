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
    <section className='hero-slider px-md '>
      {input.length > 1 && (
        <Slider
          settingsOverride={{
            autoplay: false,
            // prevArrow: <SliderCursorPrevNextText direction='prev' />,
            // nextArrow: <SliderCursorPrevNextText direction='next' />,
          }}>
          {input.map((item, i) => (
            <div className='item rounded' key={i}>
              <FigureComponent asset={item.image?.asset || null} />
            </div>
          ))}
        </Slider>
      )}
      {input.length === 1 && (
        <FigureComponent asset={input[0].image?.asset || null} />
      )}
    </section>
  );
};

export default HeroSlider;
