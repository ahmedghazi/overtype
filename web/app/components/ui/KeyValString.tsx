import { KeyValString } from "@/app/types/schema";
import React from "react";

type Props = {
  input: KeyValString;
};

const KeyValStringComponent = ({ input }: Props) => {
  return (
    <div className='grid grid-cols-3 md:grid-cols-5 mb-md gap-md'>
      <div className='key text-secondary'>{input.key}</div>
      <div className='val col-span-2 md:col-span-4'>{input.val}</div>
    </div>
  );
};

export default KeyValStringComponent;
