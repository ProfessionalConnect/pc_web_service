import { postNoHeader } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import moment from 'moment-timezone';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../components/header'
import Middle from '../../../../components/middle'
import Footer from '../../../../components/footer'
import PageBar from '../../../../components/pagebar'

const LoginViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    align-items: center;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 8px;
`

const ConnectImage = styled.img`
    width: 80px;
    height: 80px;
`

const ConnectTitle = styled.div`
    color: #202c37
    font-size: 15px;
    font-weight: bold;
    font-family: Noto Sans KR;
    margin-bottom: 10px;
`

const InputWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const DescriptImage = styled.img`
    widht: 24px;
    height: 24px;
    margin-right: 10px;
`

const EmailInput = styled.input`
    border: none;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 0 none;
    line-height: 30px;
    overflow: hidden;
`

const PasswordInput = styled.input`
    border: none;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 0 none;
    line-height: 30px;
    overflow: hidden;
`

const LoginButton = styled.button`
    width: 102px;
    height: 35px;
    background: #58ab54;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    margin-top: auto;
    margin-bottom: 20px;
    outline: none;
    border: 0;
`

const LoginView = () => {
  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const clickToLogin = () => {
    if (email.replace(/\s/g, "") === "") {
      alert("이메일을 입력해주세요")
      return
    }

    if (password.replace(/\s/g, "") === "") {
      alert("비밀번호흫 입력해주세요")
      return
    }

    loginCall({
      email: email,
      password: password
    })
  }


  const loginCall = (payload) => {
    postNoHeader(`/api/v1/users/signin`, {
      body: payload
    })
      .then(response => {
        alert("로그인 성공")
        // redirect("/main")
      }).catch(error => {
        alert("로그인 실패")
      })
  }

  return (
    <LoginViewContainer>
      <LoginBox>
        <ConnectImage src="./logo512.png" />
        <ConnectTitle>ProConnect</ConnectTitle>
        <InputWrapper>
          <DescriptImage src="./icn_account.png" />
          <EmailInput onChange={handleEmail} placeholder="이메일을 입력하세요"></EmailInput>
        </InputWrapper>
        <InputWrapper>
          <DescriptImage src="./icn_pwd.png" />
          <PasswordInput type="password" onChange={handlePassword} placeholder="비밀번호를 입력하세요"></PasswordInput>
        </InputWrapper>
        <LoginButton onClick={clickToLogin}>로그인</LoginButton>
      </LoginBox>
    </LoginViewContainer>
  );
}

export default LoginView