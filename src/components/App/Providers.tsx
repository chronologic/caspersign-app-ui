import React from "react";
import { QueryParamProvider } from "use-query-params";

import { AuthProvider } from "../../contexts";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => (
  <QueryParamProvider>
    <AuthProvider>{children}</AuthProvider>
  </QueryParamProvider>
);

export default Providers;
