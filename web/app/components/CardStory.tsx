import React from "react";
import { Figure } from "../types/schema";
import FigureComponent from "./ui/Figure";
type Props = {
  input: Figure;
};

const CardStory = ({ input }: Props) => {
  return (
    <div className='card card--story'>
      <div className='image'>
        <FigureComponent asset={input?.image?.asset} />
      </div>
      <div className='header'>
        <h3>{input?.image?.alt}</h3>
        <div>{input?.image?.credit}</div>
      </div>
    </div>
  );
};

export default CardStory;
