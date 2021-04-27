import React from "react";
import styled from "styled-components";
import { Card, Layout, Typography, Button, Space, Steps } from "antd";
import { skyblue } from "../colors";
import shield from "../../img/shield.svg";

const { Title, Text } = Typography;
const { Step } = Steps;

function Signup() {
  return (
    <Layout>
      <Main>
        <Card style={{ margin: "30px 0" }}>
          <Space direction="vertical">
            <ShieldIcon>
              <img src={shield} alt="shield" />
            </ShieldIcon>
            <Title level={2}>
              Immutable Document Signatures on the Blockchain
            </Title>
            <Text type="secondary" style={{ fontSize: "18px" }}>
              Instantly connect HelloSign with the Casper Blockchain to ensure
              the integrity of your documents and make them publicly verifiable.
            </Text>
            <Button
              type="primary"
              size="large"
              style={{
                margin: "20px 0 0 0",
                padding: "0 35px",
                background: skyblue,
                borderColor: skyblue,
              }}
              href="https://app.hellosign.com/oauth/authorize?response_type=code&client_id=2b4fc6d5fade80c4a7b9dbedebc8e7cc&state=86271647"
            >
              Connect
            </Button>
          </Space>
        </Card>
        <Space direction="vertical" size="large">
          <Title level={3}>How it works</Title>
          <Steps direction="vertical" current={-1}>
            <Step
              title="Document secrecy"
              description="We use the SHA 256 algorithm to compute a hash of your files.
              This is done in your browser so the contents of your files
              remain confidential."
              style={{ textAlign: "right", paddingRight: "55%" }}
            />
            <Step
              title="No chance of tampering"
              description="We store the SHA 256 hash of your email, the SHA 256 hash of
              your file and a timestamp on the Casper Blockchain."
              style={{ paddingLeft: "55%" }}
            />
            <Step
              title="Verification Tool"
              description="Upload a signed document and easily verify its authenticity.
                We’ll detect if the document has been modified after it was
                signed."
              style={{ textAlign: "right", paddingRight: "55%" }}
            />
          </Steps>
        </Space>
      </Main>
    </Layout>
  );
}

const ShieldIcon = styled.div`
  display: block;
  margin: 0 auto 10px;
  width: 75px;
`;

const Main = styled.div`
  width: 100%;
  text-align: center;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

export default Signup;
