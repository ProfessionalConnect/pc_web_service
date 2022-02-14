import { postNoHeader } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import React from 'react'
import styled from 'styled-components';
import { setCookie } from '../../../../utils/cookie';

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
    margin-bottom: 4px;
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

const ButtomWrapper = styled.div`
    width: 220px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: auto;
    margin-bottom: 20px;
`

const Button = styled.button`
    width: 102px;
    height: 35px;
    background: #58ab54;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    outline: none;
    border: 0;
`

const LoginView = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

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
      alert("비밀번호를 입력해주세요")
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
        setCookie("access_token", response.data.accessToken, 1)
        setCookie("refresh_token", response.data.refreshToken, 1)
        setCookie("uuid", response.data.uuid, 1)
        setCookie("role", response.data.userRole, 1)
        redirect("/setting")
      }).catch(error => {
        alert("로그인 실패")
      })
  }

  return (
    <LoginViewContainer>
      <LoginBox>
        <ConnectImage src={`${process.env.PUBLIC_URL}/logo512.png`} />
        <ConnectTitle>ProConnect</ConnectTitle>
        <InputWrapper>
          <DescriptImage src={`${process.env.PUBLIC_URL}/icn_account.png`} />
          <EmailInput onChange={handleEmail} placeholder="이메일을 입력하세요"></EmailInput>
        </InputWrapper>
        <InputWrapper>
          <DescriptImage src={`${process.env.PUBLIC_URL}/icn_pwd.png`} />
          <PasswordInput type="password" onChange={handlePassword} placeholder="비밀번호를 입력하세요"></PasswordInput>
        </InputWrapper>
        <ButtomWrapper>
          <Button onClick={clickToLogin}>로그인</Button>
          <Button onClick={() => { redirect("/signup") }}>회원가입</Button>
        </ButtomWrapper>
      </LoginBox>
    </LoginViewContainer>
  );
}

export default LoginView