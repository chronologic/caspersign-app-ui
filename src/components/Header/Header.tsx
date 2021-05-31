import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Layout, Menu, Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

import logo from "../../img/logo.svg";
import { useAuthContext, useHeaderContent } from "../../hooks";
import FlexSpacer from "../FlexSpacer";

function Header() {
  const { isAuthenticated, email, onLogout } = useAuthContext();
  const { content, setDefaultContent, resetContent } = useHeaderContent();
  const location = useLocation();

  const href = useMemo(() => {
    return window.location.origin;
  }, []);

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
        <Space>
          <a href={href}>
            <Logo>
              <img src={logo} alt="logo" />
            </Logo>
          </a>
        </Space>
        <FlexSpacer />
        {content}
      </HeaderContent>
    </Layout.Header>
  );
}

const Logo = styled.div`
  width: 150px;
  cursor: pointer;
`;

const LoginButton = styled.div`
  cursor: pointer;
  text-align: right;
  font-size: 16px;
  line-height: 20px;
  margin-left: auto;
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin: 0 auto;
`;

export default Header;
