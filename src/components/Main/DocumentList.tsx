import React from "react";
import styled from "styled-components";
import { Table, Layout, Typography, Badge, Tooltip } from "antd";
import { skyblue, applegreen, cerise } from "../colors";

const { Title, Text } = Typography;

const columns = [
  {
    title: <Text strong>HelloSign status</Text>,
    dataIndex: "status",
    render: (status: any) => (
      <Tooltip placement="top" title="Click to see on HelloSign">
        {status}
      </Tooltip>
    ),
  },
  {
    title: <Text strong>CasperSign signatures</Text>,
    dataIndex: "signatures",
    render: (signatures: any) => (
      <Tooltip placement="top" title="Click to see the details">
        {signatures}
      </Tooltip>
    ),
  },
  {
    title: <Text strong>Title</Text>,
    dataIndex: "title",
  },
  {
    title: <Text strong>Date</Text>,
    dataIndex: "date",
  },
];

const data = [
  {
    key: "1",
    status: (
      <div>
        <Badge color={skyblue} /> AWAITING MY SIGNATURE
      </div>
    ),
    signatures: <Text style={{ color: skyblue }}>0 / 3</Text>,
    title: "Example_HS_signed_completed_Referral_Agreement",
    date: "April 20, 2021",
  },
  {
    key: "2",
    status: (
      <div>
        <Badge color={applegreen} /> COMPLETED
      </div>
    ),
    signatures: <Text style={{ color: applegreen }}>3 / 3</Text>,
    title: "Example_HS_signed_completed_Referral_Agreement",
    date: "April 20, 2021",
  },
  {
    key: "3",
    status: (
      <div>
        <Badge color={applegreen} /> COMPLETED
      </div>
    ),
    signatures: <Text style={{ color: skyblue }}>1 / 3</Text>,
    title: "Example_HS_signed_completed_Referral_Agreement",
    date: "April 20, 2021",
  },
  {
    key: "4",
    status: (
      <div>
        <Badge color={cerise} /> OUT FOR SIGNATURE
      </div>
    ),
    signatures: <Text style={{ color: skyblue }}>2 / 3</Text>,
    title: "Example_HS_signed_completed_Referral_Agreement",
    date: "April 20, 2021",
  },
];

function DocumentList() {
  return (
    <Layout>
      <Main>
        <HeaderTitle>
          <Title level={4}>Documents</Title>
        </HeaderTitle>
        <Table columns={columns} dataSource={data} />
      </Main>
    </Layout>
  );
}

const Main = styled.div`
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const HeaderTitle = styled.div`
  margin: 64px 0 12px;
`;

export default DocumentList;
