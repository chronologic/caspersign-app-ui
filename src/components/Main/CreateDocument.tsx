/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import styled from "styled-components";
import { Card, Typography, Button, Input, Upload, Form } from "antd";
import { InboxOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons";

import { useCreateDocument } from "../../hooks";

const { Title, Text } = Typography;

function CreateDocument() {
  const { loading, form } = useCreateDocument();

  return (
    <Main>
      <Form form={form} name="createAndSend" layout="vertical">
        <What>
          <Title level={4}>What needs to be signed?</Title>
          <Text className="subtitle">Select document</Text>
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
                  action=""
                  multiple={false}
                  beforeUpload={() => false}
                  disabled={loading}
                >
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Upload a PDF document here</p>
                  <p className="ant-upload-hint">
                    Upload or drop your signed document here in the dropzone
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </Form.Item>
          </Card>
        </What>
        <Who>
          <Title level={4}>Who needs to sign?</Title>
          <Text className="subtitle">Add signers</Text>
          <Form.List name="signers">
            {(fields, { add, remove }) => (
              <>
                {addFirstElement(fields, add)}
                {fields.map((field, i) => (
                  <div key={field.key} className="signer">
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
                    <CloseOutlined
                      className="removeSigner"
                      onClick={() => remove(i)}
                    />
                  </div>
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
          <Button type="dashed" className="addButton" icon={<PlusOutlined />}>
            Add me as a signer
          </Button>
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

  .signer {
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
  }
`;

const What = styled.section``;

const Who = styled.section``;

let done = false;
function addFirstElement(
  fields: any[],
  add: (name?: string, index?: number) => void
): void {
  if (!done && fields.length === 0) {
    done = true;
    setTimeout(() => add());
  }
}

function getFileFromEvent(e: any): File {
  return e.file;
}

export default CreateDocument;
