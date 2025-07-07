"use client";

import { toast, ToastContainer } from "react-toastify";

export function NotifyButton() {
  const notify = () => {
    toast("👋 Hey Next.js!");
  };

  return (
    <>
      <button className='ui-btn ui-btn__accent' onClick={notify}>
        Notify
      </button>
      <ToastContainer
        autoClose={false}
        position='top-right'
        // hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </>
  );
}
