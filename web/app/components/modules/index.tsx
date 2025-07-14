import React from "react";
import { _ModulesList } from "@/app/types/extra-types";
import ModuleFontsInUseUI from "./ModuleFontsInUseUI";
import ModuleTextUI from "./ModuleTextUI";
import ModuleSliderStoriesUI from "./ModuleSliderStoriesUI";
import ModuleProductsUI from "./ModuleProductsUI";
import ModuleProjectsUI from "./ModuleProjectUI";
import "./index.scss";
import ModuleImagesUI from "./ModuleImagesUI";
import ModuleTrialsUI from "./ModuleTrialsUI";
import ModuleFaqUI from "./ModuleFaqUI";

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
        case "projectsUI":
          return <ModuleProjectsUI key={module._key} input={module} />;
        case "imagesUI":
          return <ModuleImagesUI key={module._key} input={module} />;
        case "trialsUI":
          return <ModuleTrialsUI key={module._key} input={module} />;
        case "faqUI":
          return <ModuleFaqUI key={module._key} input={module} />;
        default:
          return null;
      }
    });
  };

  return <div className='modules'>{_renderModules()}</div>;
};

export default Modules;
