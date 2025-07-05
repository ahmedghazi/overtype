import React from "react";
import { _ModulesList } from "@/app/types/extra-types";
import ModuleFontsInUseUI from "./ModuleFontsInUseUI";
import ModuleTextUI from "./ModuleTextUI";
import ModuleSliderStoriesUI from "./ModuleSliderStoriesUI";
import ModuleProductsUI from "./ModuleProductsUI";
import "./index.scss";

const Modules = ({ modules }: _ModulesList) => {
  const _renderModules = () => {
    return modules?.map((module: any, i: number) => {
      console.log(module._type);
      switch (module._type) {
        case "fontsInUseUI":
          return <ModuleFontsInUseUI key={module._key} input={module} />;
        case "textUI":
          return <ModuleTextUI key={module._key} input={module} />;
        case "sliderStoriesUI":
          return <ModuleSliderStoriesUI key={module._key} input={module} />;
        case "productsUI":
          return <ModuleProductsUI key={module._key} input={module} />;

        default:
          return null;
      }
    });
  };

  return <div className='modules'>{_renderModules()}</div>;
};

export default Modules;
