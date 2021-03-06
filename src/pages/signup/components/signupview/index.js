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
    { value: "MEMBER", name: "??????" },
    { value: "PRO", name: "??????" },
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
      alert("???????????? ??????????????????")
      return
    }

    if (password.replace(/\s/g, "") === "") {
      alert("??????????????? ??????????????????")
      return
    }

    if (password.length < 8) {
      alert("??????????????? 8?????? ???????????????")
      return
    }

    if (name.replace(/\s/g, "") === "") {
      alert("????????? ??????????????????")
      return
    }

    if (userRole !== "PRO" && userRole !== "MEMBER") {
      alert("??????????????? ??????????????????")
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
        alert("???????????? ??????")
        redirect("/login")
      }).catch(error => {
        alert("???????????? ??????")
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
              title="?????? ??????"
              setValue={setUserRole} />
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>?????????</DescriptTitle>
            <EmailInput onChange={handleEmail} placeholder="???????????? ???????????????"></EmailInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>????????????</DescriptTitle>
            <PasswordInput type="password" onChange={handlePassword} placeholder="??????????????? ???????????????"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>??????</DescriptTitle>
            <PasswordInput onChange={handleName} placeholder="????????? ???????????????"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>????????????</DescriptTitle>
            <PasswordInput onChange={handleCollege} placeholder="ex) ?????????????????????"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>????????????</DescriptTitle>
            <PasswordInput onChange={handleRectal} placeholder="ex) ?????????"></PasswordInput>
          </InputWrapper>
          <InputWrapper>
            <DescriptTitle>????????? ??????</DescriptTitle>
            <PasswordInput onChange={handleDescription} placeholder="ex) ???????????????"></PasswordInput>
          </InputWrapper>
        </InputContainer>
        <LoginButton onClick={clickToSignUp}>????????????</LoginButton>
      </SignUpBox>
    </SignUpViewContainer>
  );
}

export default SignUpView