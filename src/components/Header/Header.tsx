import React from "react";
import styled from "styled-components";
import { Layout, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import { useAuthContext } from "../../hooks";

function Header() {
  const { isAuthenticated, email, onLogout } = useAuthContext();

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
        {isAuthenticated && (
          <Dropdown trigger={["click"]} overlay={menu}>
            <LoginButton>
              {email} <DownOutlined />
            </LoginButton>
          </Dropdown>
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
  width: 100%;
  max-width: 1170px;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
`;

export default Header;
