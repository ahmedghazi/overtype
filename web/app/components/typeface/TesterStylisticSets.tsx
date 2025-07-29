import { KeyValString } from "@/app/types/schema";
import React, { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";

type Props = {
  options: any[];
  label: string;
  onChange: Function;
};

// const options = [
//   { label: "Grapes 🍇", value: "grapes" },
//   { label: "Mango 🥭", value: "mango" },
//   { label: "Strawberry 🍓", value: "strawberry", disabled: true },
// ];

const TesterStylisticSets = ({ options, label, onChange }: Props) => {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (!selected.length) return;
    onChange(selected);
  }, [selected, onChange]);

  return (
    <div>
      <h1>Select Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy={label}
        disableSearch={true}
        className='ui-select'
      />
    </div>
  );
};

export default TesterStylisticSets;
