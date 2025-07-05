import React from "react";
import { PageModulaire } from "../types/schema";
import Modules from "./modules";
import Figure from "./ui/Figure";

type Props = {
  input: PageModulaire;
};

const ContentModulaire = ({ input }: Props) => {
  console.log(input);
  return (
    <div className='content--modulaire'>
      {input.hero && (
        <section className='hero'>
          <Figure asset={input.hero.image?.asset || null} />
        </section>
      )}
      {input.modules && <Modules modules={input.modules} />}
    </div>
  );
};

export default ContentModulaire;
