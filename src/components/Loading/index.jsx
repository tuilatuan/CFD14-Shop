import React from "react";
import { Spin } from "antd";
import styled from "styled-components";
const LoadingElm = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Loading = () => (
  <LoadingElm>
    <Spin fullscreen="true" size="large" />
  </LoadingElm>
);
export default Loading;
