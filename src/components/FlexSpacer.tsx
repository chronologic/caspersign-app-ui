import React from "react";
import styled from "styled-components";
import logo from "../img/logo.svg";

const FlexSpacer = () => (
  <Spacer>
    <Logo>
      <img src={logo} alt="logo" />
    </Logo>
  </Spacer>
);

const Logo = styled.div`
  width: 150px;
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

export default FlexSpacer;
