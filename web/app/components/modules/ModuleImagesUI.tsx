import { ImagesUI } from "@/app/types/schema";
import React from "react";
import Figure from "../ui/Figure";
import clsx from "clsx";

type Props = {
  input: ImagesUI;
};

const ModuleImagesUI = ({ input }: Props) => {
  const { items } = input;
  return (
    <section className='module module--images-ui'>
      <div className='grid md:grid-cols-2 gap-md'>
        {items?.map((item, i) => (
          <div
            className={clsx("item", item.size === "w-2/2" && "col-span-2")}
            key={i}>
            <Figure asset={item.image?.asset || null} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModuleImagesUI;
