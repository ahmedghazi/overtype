import React from "react";

type Props = {
  label: string;
  name: string;
  placeholder?: string;
  type: "text" | "email";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const TextOrEmailInput = ({
  label,
  name,
  placeholder,
  type,
  onChange,
}: Props) => {
  return (
    <div className='ui-text-or-email'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={onChange}
        placeholder={placeholder || label}
      />
    </div>
  );
};

export default TextOrEmailInput;
