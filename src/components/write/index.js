import React from 'react'
import styled from 'styled-components';

const WriteWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: auto;
`

const WriteTitleBox = styled.div`
    padding: 5px;
    border-bottom: 1px solid #eee;
`

const WriteTitleTextArea = styled.textarea`
    width: 800px;
    height: 56px;
    border: none;
    font-size: 30px;
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
`

const WriteDescTextArea = styled.textarea`
    width: 800px;
    height: 400px;
    border: none;
    font-size: 30px;
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
    background: #ff5000;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    margin-top: auto;
    margin-right: 10px;
    margin-bottom: 20px;
    outline: none;
    border: 0;
`

const FileWrapper = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: 10px;
`

const FileButton = styled.input`
    display: none;
`

const FileLabel = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 102px;
    height: 35px;
    background: #ff5000;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    outline: none;
    border: 0;
`

const FileName = styled.label`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 35px;
    margin-left: 10px;
    align-items: center;
    color: #807f89;
    font-size: 12px;
    font-weight: bold;
    font-family: Noto Sans KR;
    outline: none;
    border: 0;
`

const Write = ({ clickToUploadAction, initTitle, initDesc, initUrl, buttonName }) => {
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [file, setFile] = React.useState(null)
  const [url, setUrl] = React.useState(null)
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

  React.useEffect(() => {
    setUrl(initUrl)
  }, [initUrl])

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }

  const handleDesc = (event) => {
    setDesc(event.target.value)
  }

  const handleFileInput = (event) => {
    setFile(event.target.files[0])
  }

  const getFileButtonName = () => {
    if (file === null && url === null) {
      return "썸네일 업로드"
    }
    return "썸네일 수정"
  }

  const removeThumbnailData = () => {
    setFile(null)
    setUrl(null)
  }

  return (
    <WriteWrapper>
      <WriteTitleBox>
        <WriteTitleTextArea
          onChange={handleTitle}
          placeholder="제목을 입력하세요"
          ref={titleTextArea}
        />
      </WriteTitleBox>
      <WriteDescBox>
        <WriteDescTextArea
          onChange={handleDesc}
          placeholder="본문을 입력하세요"
          ref={descTextArea}
        />
      </WriteDescBox>
      <ButtonBox>
        <WriteButton onClick={() => { clickToUploadAction(title, desc, file, url) }}>{buttonName}</WriteButton>
        <FileWrapper>
          <FileLabel htmlFor="input-file">{getFileButtonName()}</FileLabel>
          <FileButton id="input-file" type="file" onChange={handleFileInput} />
          {file && <FileName>{file.name}</FileName>}
        </FileWrapper>
        {(file || url) && <WriteButton onClick={removeThumbnailData}>썸네일 삭제</WriteButton>}
      </ButtonBox>
    </WriteWrapper>
  );
}

export default Write