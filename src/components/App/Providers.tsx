import React from "react";
import { QueryParamProvider } from "use-query-params";

import { AuthProvider, HeaderContentProvider } from "../../contexts";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => (
  <QueryParamProvider>
    <AuthProvider>
      <HeaderContentProvider>{children}</HeaderContentProvider>
    </AuthProvider>
  </QueryParamProvider>
);

export default Providers;
