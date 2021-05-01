import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import useApi from "./useApi";
import { CreateDocumentContext } from "../contexts";

export default function useCreateDocument() {
  const { form, loading, onLoadingChange } = useContext(CreateDocumentContext);
  const { createAndSend } = useApi();
  const history = useHistory();

  const onValidate = useCallback(async () => {
    const res = await form.validateFields();
    return res;
  }, [form]);

  const onSubmit = useCallback(async () => {
    onLoadingChange(true);
    try {
      const fields = await onValidate();
      const res = await createAndSend(fields);
      message.success("Sent document for signing");
      form.resetFields();
      history.push("/documents");
      return res;
    } finally {
      onLoadingChange(false);
    }
  }, [createAndSend, form, history, onLoadingChange, onValidate]);

  return { form, loading, onSubmit };
}
