import { useState } from 'react';

export const useAllert = () => {
  const [show, setShow] = useState(false);
  return { show, setShow };
};
