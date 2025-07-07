import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

type Props = {
  name: string;
  checked?: boolean;
  onChange?: Function;
  onClick?: Function;
};

const UICheckbox = ({ name, checked = false, onChange, onClick }: Props) => {
  const [active, setActive] = useState<boolean>(checked);

  // useEffect(() => {
  //   // console.log(checked);
  //   if (checked) {
  //     setTimeout(() => {
  //       setActive(true);
  //     }, 150);
  //   }
  // }, []);

  // useEffect(() => {
  //   // console.log("----Checkbox", name, active);
  //   setActive(checked);
  // }, [checked]);

  // useEffect(() => {
  //   // console.log(name, active);
  //   if (typeof onChange === "function") onChange(active);
  // }, [active]);

  const _handleChange = (e: BaseSyntheticEvent) => {
    setActive((prev) => !prev);
    setTimeout(() => {
      if (typeof onClick === "function") {
        onClick(active);
      }
    }, 150);
  };

  return (
    <div
      className='ui-checkbox'
      // onClick={() => {
      //   if (typeof onClick === "function") {
      //     setTimeout(() => {
      //       onClick(active);
      //     }, 150);
      //   }
      // }}
    >
      {/* <FormControlLabel
        required
        control={
          <Checkbox
            checked={checked}
            color='default'
            onChange={_handleChange}
            sx={{
              color: "var(--color-primary)",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
        }
        label={name}
      /> */}
      {/* <span className='label'>{name}</span> */}
      <label htmlFor={name}>
        <input
          type='checkbox'
          name={name}
          id={name}
          checked={checked}
          onChange={_handleChange}
        />
        <span className='label'>{name}</span>
      </label>
    </div>
  );
};

export default UICheckbox;
