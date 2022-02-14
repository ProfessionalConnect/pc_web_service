import React from 'react'
import styled from 'styled-components';

const CodeViewIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    color: #ffffff;
    background-color: #202c37;
`

const CodeIcon = ({ codeType }) => {
  return (<CodeViewIcon>{codeType}</CodeViewIcon>);
}

export default CodeIcon