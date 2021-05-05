import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu, Dropdown, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useAuthContext, useHeaderContent } from "../../hooks";
import FlexSpacer from "../FlexSpacer";

function Header() {
  const { isAuthenticated, email, onLogout } = useAuthContext();
  const { content, setDefaultContent, resetContent } = useHeaderContent();
  const location = useLocation();

  const defaultContent = useMemo(() => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={onLogout}>
          Logout
        </Menu.Item>
      </Menu>
    );

    return (
      isAuthenticated && (
        <Dropdown trigger={["click"]} overlay={menu}>
          <LoginButton>
            {email} <DownOutlined />
          </LoginButton>
        </Dropdown>
      )
    );
  }, [email, isAuthenticated, onLogout]);

  useEffect(() => {
    setDefaultContent(defaultContent);
  }, [defaultContent, setDefaultContent]);

  useEffect(() => {
    resetContent();
  }, [resetContent, location]);

  return (
    <Layout.Header>
      <HeaderContent>
        <FlexSpacer />
        {content}
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
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

export default Header;
