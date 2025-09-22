import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

type Props = {
  options: any[];
  label: string;
  onChange: Function;
};

const TesterFeatures = ({ options, label, onChange }: Props) => {
  const [selected, setSelected] = useState([options[0]]);
  useEffect(() => {
    // if (selected.length === 0) return;
    onChange(selected);
  }, [selected, onChange]);

  return (
    <div>
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
