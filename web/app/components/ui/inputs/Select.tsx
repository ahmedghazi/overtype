import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  name: string;
  label?: string;
  options: any[];
  defaultValue?: any;
  onChange: Function;
  disabled?: boolean;
  multiple?: boolean;
  required?: boolean;
};

const Select = ({
  name,
  label,
  options,
  defaultValue,
  onChange,
  disabled = false,
  multiple = false,
  required = false,
}: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (active) {
      document.documentElement.addEventListener("mousedown", _clickOutside);
    }
    return () => {
      document.documentElement.removeEventListener("mousedown", _clickOutside);
    };
  }, [active]);

  const _clickOutside = () => {
    // console.log("_clickOutside");
    setActive(false);
  };
  // console.log(label, defaultValue);
  return (
    <select
      className={clsx("ui-select", active && "is-active")}
      name={name}
      ref={ref as React.RefObject<HTMLSelectElement>}
      onFocus={(e) => setActive(true)}
      onBlur={(e) => setActive(false)}
      disabled={disabled}
      multiple={multiple}
      required={required}
      onChange={(e) => {
        if (e.target.value) {
          onChange(e.target.value);
          setActive(false);
        }
      }}
      defaultValue={label || defaultValue || ""}>
      {label && (
        <option defaultValue='' value=''>
          {label}
        </option>
      )}
      {options &&
        options.map((item, i) => (
          <option key={i} value={item.value}>
            {item.label}
          </option>
        ))}
      {!options && <div>Please provide some options</div>}
    </select>
  );
};

export default Select;
