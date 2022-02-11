import React from 'react'
import styled from 'styled-components';

const NotFoundWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 800px;
    margin-bottom: auto;
`

const NotFoundTitle = styled.div`
    font-weight: bold;
    font-size: 20px;
    font-family: Noto Sans KR;
    line-height: 34px;
`

const NotFoundIcon = styled.img`
    width: 40px;
    height: 40px;
`

const NotFound = ({ name }) => {
  return (
    <NotFoundWrapper>
      <NotFoundIcon src="/icn_not_found.png" />
      <NotFoundTitle>{name}</NotFoundTitle>
    </NotFoundWrapper>
  );
}

export default NotFound