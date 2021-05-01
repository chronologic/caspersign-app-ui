import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useAuthContext, useCreateDocument } from "../../hooks";
import FlexSpacer from "../FlexSpacer";

function Header() {
  const { isAuthenticated, email, onLogout } = useAuthContext();
  const { loading, onSubmit } = useCreateDocument();
  const location = useLocation();
  const history = useHistory();
  const isCreatingDoc = location.pathname.startsWith("/documents/new");

  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header>
      <HeaderContent>
        <FlexSpacer />
        {isAuthenticated && !isCreatingDoc && (
          <Dropdown trigger={["click"]} overlay={menu}>
            <LoginButton>
              {email} <DownOutlined />
            </LoginButton>
          </Dropdown>
        )}
        {isCreatingDoc && (
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
              onClick={onSubmit}
            >
              Send for signature
            </Button>
          </CreateDocButtons>
        )}
      </HeaderContent>
    </Layout.Header>
  );
}

const LoginButton = styled.div`
  cursor: pointer;
  text-align: right;
  font-size: 16px;
  line-height: 20px;
  margin-left: auto;
  margin-top: 20px;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
`;

const CreateDocButtons = styled.div`
  .ant-btn:not(:last-child) {
    margin-right: 15px;
  }
`;

export default Header;
