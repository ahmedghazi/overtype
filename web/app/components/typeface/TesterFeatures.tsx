import React, { useEffect, useRef, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

type Props = {
  options: any[];
  label: string;
  onChange: Function;
};

const TesterFeatures = ({ options, label, onChange }: Props) => {
  const [selected, setSelected] = useState([]);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // if (selected.length === 0) return;
    onChange(selected);
  }, [selected, onChange]);

  useEffect(() => {
    const defaulltheading = ref.current?.querySelector(
      ".dropdown-heading-value"
    );
    if (defaulltheading) {
      defaulltheading.textContent = label;
    }
  }, []);

  return (
    <div ref={ref}>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={label || "label"}
        disableSearch={true}
        className='ui-select'
        // defaultIsOpen={true}
        ArrowRenderer={() => (
          <svg
            width='12'
            height='7'
            viewBox='0 0 12 7'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <path d='M1 0.5L6 5.5L11 0.5' />
          </svg>
        )}
      />
    </div>
  );
};

export default TesterFeatures;
