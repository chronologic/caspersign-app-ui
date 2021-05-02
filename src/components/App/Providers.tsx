import React from "react";
import { QueryParamProvider } from "use-query-params";

import {
  AuthProvider,
  CreateDocumentProvider,
  HeaderContentProvider,
} from "../../contexts";

interface IProps {
  children: React.ReactNode;
}

const Providers = ({ children }: IProps) => (
  <QueryParamProvider>
    <AuthProvider>
      <HeaderContentProvider>
        <CreateDocumentProvider>{children}</CreateDocumentProvider>
      </HeaderContentProvider>
    </AuthProvider>
  </QueryParamProvider>
);

export default Providers;
