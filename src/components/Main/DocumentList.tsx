import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { Table, Layout, Typography, Badge, Tooltip } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import ReactTimeAgo from "react-time-ago";

import { skyblue, applegreen, cerise } from "../colors";
import { useDocumentList } from "../../hooks";
import { DocumentStatus, SignatureSummary } from "../../types";

const { Title, Text } = Typography;

const columns = [
  {
    title: <Text strong>HelloSign status</Text>,
    dataIndex: "status",
    render: (status: DocumentStatus) => {
      let formattedStatus: React.ReactNode = status;

      switch (status) {
        case DocumentStatus.AWAITING_MY_SIGNATURE: {
          formattedStatus = (
            <div>
              <Badge color={skyblue} /> AWAITING MY SIGNATURE
            </div>
          );
          break;
        }
        case DocumentStatus.COMPLETED: {
          formattedStatus = (
            <div>
              <Badge color={applegreen} /> COMPLETED
            </div>
          );
          break;
        }
        case DocumentStatus.OUT_FOR_SIGNATURE: {
          formattedStatus = (
            <div>
              <Badge color={cerise} /> OUT FOR SIGNATURE
            </div>
          );
          break;
        }
        default: {
          formattedStatus = status;
        }
      }

      return (
        <Tooltip placement="top" title="Click to see on HelloSign">
          <div style={{ display: "inline-block", cursor: "pointer" }}>
            {formattedStatus}
          </div>
        </Tooltip>
      );
    },
  },
  {
    title: <Text strong>CasperSign signatures</Text>,
    dataIndex: "signatures",
    render: (signatures: SignatureSummary[]) => {
      const completedCount = signatures.filter((sig) => sig.completed).length;
      const totalCount = signatures.length;
      const isFullyCompleted = completedCount === totalCount;

      return (
        <Tooltip placement="top" title="Click to see the details">
          <div
            style={{
              color: isFullyCompleted ? applegreen : skyblue,
              cursor: "pointer",
              display: "inline-block",
            }}
          >
            {completedCount} / {totalCount}
          </div>
        </Tooltip>
      );
    },
  },
  {
    title: <Text strong>Title</Text>,
    dataIndex: "title",
  },
  {
    title: <Text strong>Date</Text>,
    dataIndex: "createdAt",
    render: (createdAt: string) => <ReactTimeAgo date={createdAt} />,
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
  const { loading, items, meta, onPaginationChange } = useDocumentList();

  const handleTableChange = useCallback(
    ({ pageSize, current }: any) => {
      onPaginationChange({ page: current, pageSize });
    },
    [onPaginationChange]
  );

  const paginationConfig: TablePaginationConfig = useMemo(
    () => ({
      current: meta.page,
      pageSize: meta.pageSize,
      total: meta.total,
      pageSizeOptions: ["10", "25", "50", "100"],
      showSizeChanger: true,
      showTotal: (total, [from, to]) => `${from}-${to} of ${total}`,
    }),
    [meta]
  );

  return (
    <Layout>
      <Main>
        <HeaderTitle>
          <Title level={4}>Documents</Title>
        </HeaderTitle>
        <Table
          rowKey="documentUid"
          columns={columns}
          dataSource={items}
          pagination={paginationConfig}
          loading={loading}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onChange={handleTableChange as any}
        />
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
