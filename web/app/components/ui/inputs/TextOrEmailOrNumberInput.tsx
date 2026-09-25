import React from "react";
import BtnToolTip from "../buttons/BtnToolTip";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  type: "text" | "email" | "number";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
  required?: boolean;
};

const TextOrEmailOrNumberInput = ({
  label,
  name,
  placeholder,
  type,
  tooltip,
  onChange,
  required = false,
}: Props) => {
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
      />
    </div>
  );
};

export default TextOrEmailOrNumberInput;
