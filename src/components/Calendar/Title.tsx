import React from 'react';

type Props = {
  children: string;
};

const Title: React.FC<Props> = (props) => {
  const { children } = props;
  return <h1>{children}</h1>;
};

export default Title;
