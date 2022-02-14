import { postNoHeader } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import React from 'react'
import styled from 'styled-components';
import Select from '../../../../components/select';

const SignUpViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
    align-items: center;
    justify-content: center;
`

const SignUpBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 450px;
    align-items: center;
    border: 1px solid #dddddd;
    border-radius: 5px;
    padding: 8px;
`

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: auto;
`

const ConnectImage = styled.img`
    margin-top: auto;
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
    width: 300px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
`

const DescriptTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
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

const SignUpView = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [name, setName] = React.useState("")
  const [college, setCollege] = React.useState("")
  const [rectal, setRectal] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [userRole, setUserRole] = React.useState("MEMBER")
  const options = [
    { value: "MEMBER", name: "학생" },
    { value: "PRO", name: "프로" },
  ]

  const handleEmail = (event) => {
    setEmail(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  const handleCollege = (event) => {
    setCollege(event.target.value)
  }

  const handleRectal = (event) => {
    setRectal(event.target.value)
  }

  const handleDescription = (event) => {
    setDescription(event.target.value)
  }

  const clickToSignUp = () => {
    if (email.replace(/\s/g, "") === "") {
      alert("이메일을 입력해주세요")
      return
    }

    if (password.replace(/\s/g, "") === "") {
      alert("비밀번호를 입력해주세요")
      return
    }

    if (password.length < 8) {
      alert("비밀번호는 8자리 이상입니다")
      return
    }

    if (name.replace(/\s/g, "") === "") {
      alert("이름을 입력해주세요")
      return
    }

    if (userRole !== "PRO" && userRole !== "MEMBER") {
      alert("회원종류를 선택해주세요")
      return
    }

    signUpCall({
      email: email,
      password: password,
      nickname: name,
      college: college,
      rectal: rectal,
      description: description,
      userRole: userRole
    })
  }


  const signUpCall = (payload) => {
    let rolePath = "ss"

    if (payload.userRole === "PRO") {
      rolePath = "ps"
    }

    postNoHeader(`/api/v1/users/${rolePath}/signup`, {
      body: payload
    })
      .then(response => {
        alert("회원가입 성공")
        redirect("/login")
      }).catch(error => {
        alert("회원가입 실패")
      })
  }

  return (
    <SignUpViewContainer>
      <SignUpBox>
        <ConnectImage src={`${process.env.PUBLIC_URL}/logo512.png`} />
        <ConnectTitle>ProConnect</ConnectTitle>
        <InputContainer>
          <InputWrapper>
            <Select
              styled={{ marginBottom: "4px" }}
              options={options}
              defaultValue="MEMBER"
              title="회원 종류"
              setValue={setUserRole} />
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>이메일</DescriptTitle>
            <EmailInput onChange={handleEmail} placeholder="이메일을 입력하세요"></EmailInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>비밀번호</DescriptTitle>
            <PasswordInput type="password" onChange={handlePassword} placeholder="비밀번호를 입력하세요"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>이름</DescriptTitle>
            <PasswordInput onChange={handleName} placeholder="이름을 입력하세요"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>소속대학</DescriptTitle>
            <PasswordInput onChange={handleCollege} placeholder="ex) 한국항공대학교"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>소속직장</DescriptTitle>
            <PasswordInput onChange={handleRectal} placeholder="ex) 네이버"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>프로필 설명</DescriptTitle>
            <PasswordInput onChange={handleDescription} placeholder="ex) 안녕하세요"></PasswordInput>
          </InputWrapper>
        </InputContainer>
        <LoginButton onClick={clickToSignUp}>회원가입</LoginButton>
      </SignUpBox>
    </SignUpViewContainer>
  );
}

export default SignUpView