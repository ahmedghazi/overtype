"use client";
import React from "react";
import clsx from "clsx";
import { SliderStoriesUI } from "@/app/types/schema";
import CardStory from "../CardStory";
import Stories from "react-insta-stories";
import "./ModuleSliderStoriesUI.scss";
import useDeviceDetect from "@/app/hooks/useDeviceDetect";

interface Props {
  input: SliderStoriesUI;
}

const ModuleSliderStoriesUI = ({ input }: Props) => {
  const { title, items } = input;
  const { isMobile } = useDeviceDetect();
  // console.log(items);
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
            // height={isMobile ? "230px" : "var(--main-h, 750px)"}
            height={"var(--main-h, 750px)"}
            stories={stories}
            progressContainerStyles={{
              bottom: isMobile ? "var(--spacing-md)" : "var(--spacing-md)",
              gap: isMobile
                ? "calc(var(--spacing-2xs) * 1.25)"
                : "var(--spacing-md)",
              borderRadius: "100%",
              padding: isMobile
                ? "var(--spacing-md) var(--spacing-md) 0"
                : "7px 5px 5px",
              width: isMobile ? "100%" : "98%",
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
