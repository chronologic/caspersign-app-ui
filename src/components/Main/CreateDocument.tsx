/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Button, Input, Upload, Form, message } from "antd";
import { InboxOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";

import { DocumentUploadFormData } from "../../types";
import { useApi, useAuthContext, useHeaderContent } from "../../hooks";

const { Title, Text } = Typography;

function CreateDocument() {
  const history = useHistory();
  const [form] = Form.useForm();
  const { email } = useAuthContext();
  const { setContent } = useHeaderContent();
  const { createAndSend } = useApi();
  const [addMe, setAddMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [extraSignersCount, setExtraSignersCount] = useState(0);
  const [invalidFile, setInvalidFile] = useState(false);
  const [fileName, setFileName] = useState("");

  const meName = useMemo(() => {
    let name = email.split("@")[0];
    name = name.split(".").join(" ");
    name = name.split("+").join(" ");
    name = name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");
    return name;
  }, [email]);

  const handleAddMe = useCallback(() => {
    setAddMe(true);
  }, []);
  const handleDontAddMe = useCallback(() => {
    setAddMe(false);
  }, []);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
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
      setLoading(false);
    }
  }, [createAndSend, form, history]);

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const headerContent = useMemo(
    () => (
      <CreateDocButtons>
        <Button
          type="ghost"
          size="large"
          disabled={loading}
          onClick={handleGoBack}
        >
          Back
        </Button>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSubmit}
        >
          Send for signature
        </Button>
      </CreateDocButtons>
    ),
    [handleGoBack, handleSubmit, loading]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addFirstElement = useCallback(
    (() => {
      let done = false;
      return (fields: any[], add: (name?: string, index?: number) => void) => {
        if (!done && fields.length === 0) {
          done = true;
          setTimeout(() => add());
        }
      };
    })(),
    []
  );

  const handleDragEnterFile = useCallback((event) => {
    const fileType = event.dataTransfer?.items[0]?.type;
    setInvalidFile(fileType !== "application/pdf");
  }, []);

  const getFileFromEvent = useCallback((e) => {
    if (!e.file.status) {
      setFileName(e.file.name);
    }
    return e.file;
  }, []);

  const handleRemoveFileName = useCallback(() => {
    setFileName("");
  }, []);

  useEffect(() => {
    setContent(headerContent);
  }, [headerContent, setContent]);

  return (
    <Main>
      <Form form={form} name="createAndSend" layout="vertical">
        <What>
          <Title level={4}>What needs to be signed?</Title>
          <Text className="subtitle">Select document</Text>
          <div
            className={invalidFile ? "invalidFile" : ""}
            onDragEnter={handleDragEnterFile}
          >
            <Card>
              <Form.Item>
                <Form.Item
                  name="file"
                  valuePropName="file"
                  getValueFromEvent={getFileFromEvent}
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Document is required",
                    },
                  ]}
                >
                  <Upload.Dragger
                    name="file"
                    accept="application/pdf"
                    action=""
                    multiple={false}
                    beforeUpload={() => false}
                    disabled={loading}
                    onRemove={handleRemoveFileName}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      {invalidFile
                        ? "Only PDF files are accepted!"
                        : fileName || "Upload a PDF document here"}
                    </p>
                    <p className="ant-upload-hint">
                      {!fileName &&
                        "Upload or drop your signed document here in the dropzone"}
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form.Item>
            </Card>
          </div>
          <Form.Item
            label="Document title"
            name="title"
            rules={[{ required: true, message: "Document title is required" }]}
          >
            <Input type="text" maxLength={200} />
          </Form.Item>
        </What>
        <Who>
          <Title level={4}>Who needs to sign?</Title>
          <Text className="subtitle">Add signers</Text>
          {addMe && (
            <Signer>
              <Form.Item
                label="Name"
                name="meName"
                initialValue={meName}
                rules={[{ required: true, message: "Name is required" }]}
              >
                <Input type="text" />
              </Form.Item>
              <Form.Item
                label="Email address"
                name="meEmail"
                initialValue={email}
                rules={[{ required: true, message: "Email is required" }]}
              >
                <Input type="email" />
              </Form.Item>
              {extraSignersCount > 0 && (
                <CloseOutlined
                  className="removeSigner"
                  onClick={handleDontAddMe}
                />
              )}
            </Signer>
          )}
          <Form.List name="signers">
            {(fields, { add, remove }) => (
              <>
                {addFirstElement(fields, add)}
                {extraSignersCount !== fields.length &&
                  setTimeout(() => setExtraSignersCount(fields.length))}
                {fields.map((field, i) => (
                  <Signer key={field.key}>
                    <Form.Item
                      {...field}
                      key={`${field.key}name`}
                      label="Name"
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Name is required" }]}
                    >
                      <Input type="text" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      key={`${field.key}email_address`}
                      label="Email address"
                      name={[field.name, "email_address"]}
                      fieldKey={[field.fieldKey, "email_address"]}
                      rules={[{ required: true, message: "Email is required" }]}
                    >
                      <Input type="email" />
                    </Form.Item>
                    {(extraSignersCount > 1 || addMe) && (
                      <CloseOutlined
                        className="removeSigner"
                        onClick={() => remove(i)}
                      />
                    )}
                  </Signer>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  className="addButton"
                  icon={<PlusOutlined />}
                >
                  Add another signer
                </Button>
              </>
            )}
          </Form.List>
          {!addMe && (
            <Button
              type="dashed"
              className="addButton"
              icon={<PlusOutlined />}
              onClick={handleAddMe}
            >
              Add me as a signer
            </Button>
          )}
          <Form.Item label="Message (optional)" name="message">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Who>
      </Form>
    </Main>
  );
}

const Main = styled.div`
  width: 100%;
  max-width: 1170px;
  padding: 32px 15px;
  margin-right: auto;
  margin-left: auto;

  .subtitle {
    display: inline-block;
    color: gray;
    margin-bottom: 15px;
  }

  .addButton {
    display: block;
    width: 100%;
    margin-bottom: 16px;
    text-align: left;
  }

  .invalidFile {
    .ant-upload-drag-icon .anticon {
      transition: color 0.3s ease;
      color: red !important;
    }
    .ant-form-item .ant-upload.ant-upload-drag {
      transition: background-color 0.3s ease;
      background-color: mistyrose;
    }
  }
`;

const What = styled.section``;

const Who = styled.section``;

const Signer = styled.div`
  display: flex;
  flex-direction: row;
  background: #fafafa;
  margin-bottom: 16px;
  position: relative;

  .ant-row {
    flex-basis: 50%;
    padding: 8px 16px;
  }

  .removeSigner {
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    font-size: 16px;
    color: darkgrey;

    &:hover {
      color: gray;
    }
  }
`;

const CreateDocButtons = styled.div`
  .ant-btn:not(:last-child) {
    margin-right: 15px;
  }
`;

export default CreateDocument;
