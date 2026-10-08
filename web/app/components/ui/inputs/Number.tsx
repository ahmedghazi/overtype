// import React from "react";
// import BtnToolTip from "../buttons/BtnToolTip";

// type Props = {
//   label: string;
//   name: string;
//   placeholder?: string;
//   type: "number";
//   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
//   tooltip?: string;
// };

// const Number = ({
//   label,
//   name,
//   placeholder,
//   type,
//   tooltip,
//   onChange,
// }: Props) => {
//   return (
//     <div className='ui-text-or-email-or-number'>
//       <div className='header'>
//         <label htmlFor={name}>{label}</label>
//         {tooltip && <BtnToolTip text={tooltip} />}
//       </div>
//       <input
//         type={type}
//         name={name}
//         id={name}
//         onChange={onChange}
//         placeholder={placeholder || label}
//       />
//     </div>
//   );
// };

// export default Number;
