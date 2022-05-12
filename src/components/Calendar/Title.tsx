import { FC, memo, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export const Title: FC<Props> = memo((props: Props) => {
  const { children } = props;
  return <h1>{children}</h1>;
});
