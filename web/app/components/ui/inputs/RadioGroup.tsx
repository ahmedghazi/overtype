import clsx from "clsx";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import { _slugify } from "../../shop/utils";
import Radio from "./Radio";

type Value = {
  label: string;
  value: string;
};
type Props = {
  name: string;
  label: string;
  values: Value[];
  onChange?: (value: string) => void;
};

const RadioGroup = ({ name, label, values, onChange }: Props) => {
  // const ref = useRef<HTMLInputElement>(null);

  // const _handleChange = (e: BaseSyntheticEvent) => {
  //   console.log(e.target.id, e.target.checked, e.target.value);
  //   onChange?.(e.target.value);
  // };
  const _handleChange = (val: string) => {
    // console.log(val);
    onChange?.(val);
  };

  return (
    <div className={clsx("ui-radio--group")}>
      <div className='label'>{label}</div>
      <div className='flex gap-2xs'>
        {values.map((value, i) => (
          <Radio
            key={i}
            name={_slugify(name)}
            label={value.label}
            onChange={() => _handleChange(value.value)}
          />
          // <label htmlFor={_slugify(value)} key={i}>
          //   <input
          //     type='radio'
          //     name={_slugify(name)}
          //     // ref={ref}
          //     id={value}
          //     value={value}
          //     // defaultChecked={isChecked ? true : false}
          //     onChange={_handleChange}
          //   />
          //   {value}
          // </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
