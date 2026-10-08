import React, { useEffect, useRef } from "react";
import BtnToolTip from "../buttons/BtnToolTip";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  type: "text" | "email" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
  required?: boolean;
  value?: string;
};

const TextOrEmailOrNumberInput = ({
  label,
  name,
  placeholder,
  type,
  tooltip,
  onChange,
  required = false,
  value,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current && value) {
      ref.current.value = value;
    }
  }, [value]);
  return (
    <div className='ui-text-or-email-or-number'>
      <div className='header'>
        <label htmlFor={name}>
          {label}
          {required && "*"}
        </label>
        {tooltip && <BtnToolTip text={tooltip} />}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder || label}
        required={required}
        // value={value || ""}
        ref={ref}
      />
    </div>
  );
};

export default TextOrEmailOrNumberInput;
