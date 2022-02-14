import React from 'react'
import styled from 'styled-components';

const WriteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: auto;
`

const WriteTitleBox = styled.div`
    padding: 5px;
    border: 1px solid #dddddd;
    border-radius: 5px;
`

const WriteTitleTextArea = styled.textarea`
    width: 500px;
    height: 30px;
    border: none;
    font-size: 20px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 0 none;
    line-height: 40px;
    overflow: hidden;
`

const WriteDescBox = styled.div`
    padding: 5px;
    margin-top: 10px;
    border: 1px solid #dddddd;
    border-radius: 5px;
    margin-bottom: 10px;
`

const WriteDescTextArea = styled.textarea`
    width: 500px;
    height: 200px;
    border: none;
    font-size: 20px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 0 none;
    line-height: 40px;
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
`

const WriteButton = styled.button`
    width: 102px;
    height: 35px;
    background: #58ab54;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    margin-top: auto;
    margin-left: auto;
    margin-bottom: 20px;
    outline: none;
    border: 0;
`

const TeamWrite = ({ clickToUploadAction, initTitle, initDesc, buttonName }) => {
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const titleTextArea = React.useRef();
  const descTextArea = React.useRef();

  React.useEffect(() => {
    setTitle(initTitle)
    titleTextArea.current.value = initTitle
  }, [initTitle])

  React.useEffect(() => {
    setDesc(initDesc)
    descTextArea.current.value = initDesc
  }, [initDesc])

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleDesc = (event) => {
    setDesc(event.target.value)
  }

  return (
    <WriteWrapper>
      <WriteTitleBox>
        <WriteTitleTextArea
          onChange={handleTitle}
          placeholder="팀명을 입력하세요"
          ref={titleTextArea}
        />
      </WriteTitleBox>
      <WriteDescBox>
        <WriteDescTextArea
          onChange={handleDesc}
          placeholder="설명을 입력하세요"
          ref={descTextArea}
        />
      </WriteDescBox>
      <ButtonBox>
        <WriteButton onClick={() => { clickToUploadAction(title, desc) }}>{buttonName}</WriteButton>
      </ButtonBox>
    </WriteWrapper>
  );
}

export default TeamWrite