import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  name: string;
  label?: string;
  options: any[];
  defaultValue?: any;
  onChange: Function;
  disabled?: boolean;
};

const Select = ({
  name,
  label,
  options,
  defaultValue,
  onChange,
  disabled = false,
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
      onChange={(e) => {
        // console.log(e.target.value);
        if (e.target.value) {
          // onChange(JSON.parse(e.target.value));
          onChange(e.target.value);
          setActive(false);
        }
      }}
      defaultValue={
        // label === "" && options[0] && options[0]._type === "keyValString"
        //   ? JSON.stringify(options[0])
        //   : ""
        label || defaultValue || ""
      }>
      {label && (
        <option defaultValue='' value=''>
          {label}
        </option>
      )}
      {options &&
        options.map((item, i) => (
          <option
            key={i}
            // value={JSON.stringify(item)}
            // value={JSON.stringify(item.value)}
            value={item.value}
            // value={item._key}
            // defaultValue={item.selected}
            // defaultValue={JSON.stringify(item)}
          >
            {item.label}
          </option>
        ))}
      {/* <i className='icon icon-drop-down'></i> */}
      {!options && <div>Please provide some options</div>}
    </select>
  );
};

export default Select;
