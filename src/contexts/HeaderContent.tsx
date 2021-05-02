import React, { createContext, useState } from "react";

export interface IHeaderContentContext {
  content: React.ReactNode;
  setContent: (newContent: React.ReactNode) => void;
}

interface IProps {
  children: React.ReactNode;
}

export const HeaderContentContext = createContext<IHeaderContentContext>({
  content: null,
  setContent: () => {},
});

const HeaderContentProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [content, setContent] = useState<React.ReactNode>(null);

  return (
    <HeaderContentContext.Provider value={{ content, setContent }}>
      {children}
    </HeaderContentContext.Provider>
  );
};

export default HeaderContentProvider;
