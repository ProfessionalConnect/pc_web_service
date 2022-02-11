import React from 'react'
import styled from 'styled-components';

const FooterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width: 100%;
    color: #eeeeee;
    font-size: 0.8em;
    font-family: Noto Sans KR;
`

const Footer = () => {
  return (
    <FooterContainer>
      Powered By Minky
    </FooterContainer>
  );
}

export default Footer