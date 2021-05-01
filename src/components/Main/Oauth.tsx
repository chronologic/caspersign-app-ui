import React, { useEffect, useState } from "react";
import { Typography } from "antd";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQueryParam } from "use-query-params";

import { useApi } from "../../hooks";
import Spinner from "./Spinner";

const { Title } = Typography;

export default function Oauth() {
  const { oauth } = useApi();
  const [oauthCode] = useQueryParam<string>("code");
  const [oauthState] = useQueryParam<string>("state");
  const [done, setDone] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (oauthCode && oauthState && !done) {
      auth();
    }

    async function auth() {
      setDone(true);
      try {
        await oauth(oauthCode, oauthState);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
      history.push("/documents");
    }
  }, [done, history, oauth, oauthCode, oauthState]);

  return <Authenticating />;
}

function Authenticating() {
  return (
    <Content>
      <Title level={4}>Authenticating...</Title>
      <br />
      <Spinner size={50} />
    </Content>
  );
}

const Content = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
