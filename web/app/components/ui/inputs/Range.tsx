import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  label: string;
  min: string;
  max: string;
  initialValue: string;
  target: HTMLDivElement | null;
  cssVar: string;
  step?: string;
  unit?: string;
};

export type Ref = HTMLDivElement;

// const TesterSize = forwardRef<Ref, Props>(({ initialValue }, ref) => {
const Range = ({
  label,
  initialValue,
  target,
  min,
  max,
  step,
  cssVar,
  unit = "px",
}: Props) => {
  // const { initialValue } = props;
  // console.log(ref);
  const [value, setValue] = useState<string>(initialValue);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    _update();
  }, []);

  useEffect(() => {
    // console.debug({ target })
    _update();
  }, [value]);

  function getBackgroundSize() {
    const _min = parseFloat(min) || 0;
    const _max = parseFloat(max) || 100;
    const _value = parseFloat(value);

    const size = ((_value - _min) / (_max - _min)) * 100;

    return size.toString() + "%";
  }

  const _update = () => {
    if (!target) return;
    target.style.setProperty(cssVar, `${value}${unit}`);

    ref.current?.style.setProperty("--background-size", getBackgroundSize());
  };

  return (
    <div className='ui-range '>
      <div className='flex justify-between label'>
        <label htmlFor={label} className=''>
          {label}
        </label>

        <input
          type='number'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {unit}
      </div>
      <input
        ref={ref}
        type='range'
        name={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Range;
