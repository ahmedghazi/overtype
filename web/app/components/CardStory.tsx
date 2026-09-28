import React from "react";
import { Figure } from "../types/schema";
import FigureComponent from "./ui/Figure";
import clsx from "clsx";
type Props = {
  input: Figure;
  lightMode?: boolean;
};

const CardStory = ({ input, lightMode = true }: Props) => {
  // console.log(input?.image);
  return (
    <div className={clsx("card card--story", lightMode && "light-mode")}>
      <div className='image'>
        <FigureComponent asset={input?.image?.asset} width={2000} />
      </div>
      {!lightMode && (
        <div className='header'>
          <h3>{input?.image?.alt}</h3>
          <div>{input?.image?.credit}</div>
        </div>
      )}
    </div>
  );
};

export default CardStory;
