import React from 'react'
import styled from 'styled-components';
import { redirect } from '../../utils/redirect';

const MiddleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    min-height: 100px;
    width: 100%;
    padding-top: 10px;
    border-top: 1px solid #eee;
`

const MiddleBox = styled.div`
    display: flex;
    flex-direction: row;
`

const ContactBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px;
`

const ContactTitle = styled.div`
    color: #202c37;
    font-size: 1em;
    font-family: Noto Sans KR;
    padding-bottom: 14px;
`

const ContactDesc = styled.div`
    color: #202c37;
    font-size: 0.9em;
    font-family: Noto Sans KR;
`

const GitBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px;
`

const GitTitle = styled.div`
    color: #202c37;
    font-size: 1em;
    font-family: Noto Sans KR;
    padding-bottom: 14px;
`

const GitLink = styled.a`
    color: #202c37;
    font-size: 0.9em;
    font-family: Noto Sans KR;
`

const EditBox = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 40px;
`

const EditTitle = styled.div`
    color: #202c37;
    font-size: 1em;
    font-family: Noto Sans KR;
    padding-bottom: 14px;
`

const EditIcon = styled.img`
    width: 20px;
    height: 20px;
    padding: 5px;
    border-radius: 50px;
    background: #58ab54;
    cursor: pointer;
`

const Middle = ({ isEdit, redirectURL }) => {
  return (
    <MiddleContainer>
      <MiddleBox>
        <ContactBox>
          <ContactTitle>Contact Me</ContactTitle>
          <ContactDesc>zx6486@gmail.com</ContactDesc>
        </ContactBox>
        <GitBox>
          <GitTitle>Github Link</GitTitle>
          <GitLink href="https://github.com/MK-Lee13">MK-Lee13</GitLink>
        </GitBox>
        {isEdit && (
          <EditBox>
            <EditTitle>New Post</EditTitle>
            <EditIcon src={`${process.env.PUBLIC_URL}/icn_create.png`} onClick={() => { redirect(redirectURL) }}></EditIcon>
          </EditBox>
        )}
      </MiddleBox>
    </MiddleContainer>
  );
}

export default Middle