"use client";
import React from "react";
import clsx from "clsx";
import { SliderStoriesUI } from "@/app/types/schema";
import CardStory from "../CardStory";
import Stories from "react-insta-stories";
import "./ModuleSliderStoriesUI.scss";

interface Props {
  input: SliderStoriesUI;
}

const ModuleSliderStoriesUI = ({ input }: Props) => {
  const { title, items } = input;

  const stories = items?.map((item, i) => {
    const arr = {
      content: (props: any) => <CardStory input={item} />,
    };
    return arr;
  });
  return (
    <section
      className={clsx("module module--slider-stories-ui px-xs md:px-md")}>
      {stories && (
        <div className='rounded'>
          <Stories
            loop={true}
            width={"100%"}
            height={"var(--main-h, 750px)"}
            stories={stories}
            progressContainerStyles={{
              bottom: "var(--spacing-md)",
              gap: "var(--spacing-xl)",
            }}
            storyStyles={{
              width: "100%",
              backgroundColor: "var(--color-bg)",
            }}
          />
        </div>
      )}
    </section>
  );
};

export default ModuleSliderStoriesUI;
