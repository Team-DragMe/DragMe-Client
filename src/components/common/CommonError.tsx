import 'react-toastify/dist/ReactToastify.css';

import React, { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { Nullable } from 'src/types';

interface CommonErrorProps {
  error: Nullable<Error>;
  reset: () => void;
}

function CommonError({ error, reset }: CommonErrorProps) {
  const customId = error?.message;

  const notify = () =>
    toast.error(`${customId ? customId : 'Unknown error'}`, {
      autoClose: 3000,
      position: toast.POSITION.TOP_RIGHT,
      toastId: customId,
      theme: 'light',
    });

  useEffect(() => {
    if (error) {
      notify();
    }
  }, []);

  return <ToastContainer />;
}

export default CommonError;
