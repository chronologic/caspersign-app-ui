import React from "react";
import { QueryParamProvider } from "use-query-params";

import { AuthProvider, CreateDocumentProvider } from "../../contexts";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => (
  <QueryParamProvider>
    <AuthProvider>
      <CreateDocumentProvider>{children}</CreateDocumentProvider>
    </AuthProvider>
  </QueryParamProvider>
);

export default Providers;
