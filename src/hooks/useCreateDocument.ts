import { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import { CreateDocumentContext } from "../contexts";
import { DocumentUploadFormData } from "../types";
import useApi from "./useApi";

export default function useCreateDocument() {
  const { form, loading, onLoadingChange } = useContext(CreateDocumentContext);
  const { createAndSend } = useApi();
  const history = useHistory();

  const onSubmit = useCallback(async () => {
    onLoadingChange(true);
    try {
      const fields = await form.validateFields();
      const data: DocumentUploadFormData = {
        file: fields.file,
        signers: fields.signers,
        title: fields.title,
        message: fields.message,
      };
      if (fields.meName) {
        data.signers.unshift({
          name: fields.meName,
          email_address: fields.meEmail,
        });
      }
      const res = await createAndSend(fields);
      message.success("Sent document for signing");
      form.resetFields();
      history.push("/documents");
      return res;
    } finally {
      onLoadingChange(false);
    }
  }, [createAndSend, form, history, onLoadingChange]);

  return { form, loading, onSubmit };
}
