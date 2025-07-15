import clsx from "clsx";
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  label: string;
  isChecked?: boolean;
  subLabel?: string;
  onChange?: (value: string) => void;
};

const Radio = ({
  name,
  label,
  isChecked = false,
  subLabel,
  onChange,
}: Props) => {
  const [checked, setChecked] = useState(isChecked);
  const ref = useRef<HTMLInputElement>(null);

  const _handleChange = (e: BaseSyntheticEvent) => {
    console.log(e.target.id, e.target.checked, e.target.value);
    // onChange?.(e.target.value);
    onChange?.(e.target.id);
    // setChecked(e.target.checked);
    // setChecked(e.target.checked);
  };

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  return (
    <div
      className={clsx("ui-radio", checked && "is-active")}
      onClick={() => ref.current?.click()}>
      <div className='inner'>
        <label htmlFor={label}>
          <input
            type='radio'
            name={name}
            id={label}
            ref={ref}
            defaultChecked={isChecked ? true : false}
            onChange={_handleChange}
          />
          {label}
        </label>
      </div>
      {subLabel && <span className='sub-label text-sm'>{subLabel}</span>}
    </div>
  );
};

export default Radio;
