"use client";
import { _localizeField } from "@/app/sanity-api/utils";
import { Product, TrialsUI } from "@/app/types/schema";
import { PortableText } from "next-sanity";
import React, { useEffect, useState } from "react";
import useTypeFace, {
  TypeFaceContextProvider,
} from "../typeface/TypeFaceContext";
import "./ModuleTrialsUI.scss";
import Radio from "../ui/inputs/Radio";
import Checkbox from "../ui/inputs/Checkbox";
import clsx from "clsx";
import useShop from "../shop/ShopContext";
import TextOrEmailInput from "../ui/inputs/TextOrEmailInput";
import Btn from "../ui/buttons/Btn";
import portableTextComponents from "@/app/sanity-api/portableTextComponents";
type TrialItemProps = {
  input: Product;
};
const TrialItem = ({ input }: TrialItemProps) => {
  const { type, dispatchType } = useTypeFace();
  const { trials, setTrials } = useShop();
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);
  const defaultTypeface = input.defaultTypeface;

  useEffect(() => {
    if (!defaultTypeface) return;
    dispatchType(defaultTypeface);
    setReady(true);
  }, [input, defaultTypeface, dispatchType]);

  const onChange = (checked: boolean) => {
    setChecked(checked);
  };

  useEffect(() => {
    if (checked) {
      setTrials({ type: "ADD", payload: input });
    } else {
      setTrials({ type: "REMOVE", payload: input });
    }
  }, [checked, input, setTrials]);

  if (!defaultTypeface) return null;
  const isIn = trials?.some((el) => el._id === input._id);

  return (
    <div
      className={clsx("ui-trial bg-btn", isIn && "is-active")}
      onClick={() => setChecked(!checked)}>
      <div className='t-preview' style={{ fontFamily: type?.slug?.current }}>
        <Checkbox
          name={input.title || ""}
          checked={checked}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

type Props = {
  input: TrialsUI;
};
const ModuleTrialsUI = ({ input }: Props) => {
  const { text, items, textOptin } = input;
  const [email, setEmail] = useState<string>("");
  const [optin, setOptin] = useState<boolean>(false);

  const { trials } = useShop();

  const _handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, optin, trials);
    if (!email || !optin || !trials) return;
    const response = await fetch("/api/trials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        optin,
        trials,
      }),
    });
    const result = await response.json();
    console.log(result);
  };
  return (
    <section className='module module--trials-ui px-xs md:px-md'>
      {/* <div className='h-3xl md:h-[112px]'></div> */}
      <div className='c-container'>
        <div className='header mb-3xl px-md'>
          <h1 className='text-2xl md:text-3xl mb-4xl'>Select trials</h1>
          <div className='text text-center'>
            <PortableText value={_localizeField(text)} />
          </div>
        </div>
        <div className='items mb-4xl'>
          {items?.map((item, i) => (
            <div key={i}>
              <TypeFaceContextProvider>
                <TrialItem input={item} />
              </TypeFaceContextProvider>
            </div>
          ))}
        </div>
        <div className='footer box'>
          <form onSubmit={_handleSubmit}>
            <div className='form-row mb-md'>
              <TextOrEmailInput
                label='Enter your email adress to request trials'
                name='email'
                type='email'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='form-row optin'>
              <input
                type='checkbox'
                id='optin'
                required
                onChange={(e) => setOptin(e.target.checked)}
              />
              <label htmlFor='optin'>
                <PortableText
                  value={_localizeField(textOptin)}
                  components={portableTextComponents}
                />
              </label>
            </div>
            <div className='form-row text-center py-4xl'>
              <Btn label='Request trials' variant='accent' />
            </div>
          </form>
        </div>

        <pre>{JSON.stringify(trials, null, 2)}</pre>
      </div>
    </section>
  );
};

export default ModuleTrialsUI;
