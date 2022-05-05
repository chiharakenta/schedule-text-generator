import React from 'react';

type Props = {
  title: string;
};

const Title: React.FC<Props> = (props) => {
  const { title } = props;
  return <h1>{title}</h1>;
};

export default Title;
