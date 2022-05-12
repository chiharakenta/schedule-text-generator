import React, { createContext, ReactNode } from 'react';

type ScheduleContextType = {
  contextName: string;
};

export const ScheduleContext = createContext<ScheduleContextType>({} as ScheduleContextType);

export const ScheduleProvider: React.FC<{ children: ReactNode }> = (props) => {
  const { children } = props;
  const contextName = 'ちはけん';
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ScheduleContext.Provider value={{ contextName }}>{children}</ScheduleContext.Provider>;
};
