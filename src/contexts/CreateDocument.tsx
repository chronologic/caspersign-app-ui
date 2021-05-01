import React, { createContext, useCallback, useState } from "react";
import { Form } from "antd";
import { FormInstance } from "antd/lib/form";

export interface ICreateDocumentContext {
  form: FormInstance;
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
}

interface IProps {
  children: React.ReactNode;
}

export const CreateDocumentContext = createContext<ICreateDocumentContext>({
  form: {} as any,
  loading: false,
  onLoadingChange: () => {},
});

const CreateDocumentProvider: React.FC<IProps> = ({ children }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onLoadingChange = useCallback((l: boolean) => {
    setLoading(l);
  }, []);

  return (
    <CreateDocumentContext.Provider value={{ form, loading, onLoadingChange }}>
      {children}
    </CreateDocumentContext.Provider>
  );
};

export default CreateDocumentProvider;
