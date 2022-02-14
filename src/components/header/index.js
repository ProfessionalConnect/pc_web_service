import React from 'react'
import styled from 'styled-components';
import { redirect } from '../../utils/redirect';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 140px;
    width: 100%;
    margin-bottom: 60px;
    border-bottom: 1px solid #eee;
`

const HeaderElement = styled.div`
    color: #202c37;
    font-size: 2em;
    font-family: Noto Sans KR;
    cursor: pointer
`

const Header = ({ name, redirectURL }) => {
  return (
    <HeaderContainer>
      <HeaderElement onClick={() => { redirect(redirectURL) }}>{name}</HeaderElement>
    </HeaderContainer>
  );
}

export default Header