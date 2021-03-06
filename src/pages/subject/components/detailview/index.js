import { get, post } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import moment from 'moment-timezone';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../components/header'
import Middle from '../../../../components/middle'
import Footer from '../../../../components/footer'
import NotFound from '../../../../components/notfound'
import Editor from '../../../../components/editor'
import PassIcon from '../../../../components/icon/passicon'
import CodeIcon from '../../../../components/icon/codeicon'
// import Comment from '../comment'
import { getCookie } from '../../../../utils/cookie';

const DetailViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const DetailViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
    margin-bottom: auto;
`

const DetailViewBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 800px;
    margin-bottom: auto;
    padding-bottom: 20px;
`

const DescriptionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    margin-bottom: auto;
`

const CodeEditerWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 450px;
    margin-bottom: auto;
`

const DetailViewTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const DetailViewTitleBox = styled.div`
    padding: 5px;
    font-weight: bold;
    font-size: 28px;
    font-family: Noto Sans KR;
    line-height: 34px;
    word-wrap: break-word;
`

const DetailViewTimeBox = styled.div`
    padding: 5px;
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const DetailViewEditBox = styled.div`
    display: flex;
    flex-direction: row;
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-left: auto;
`

const RegistButton = styled.button`
    width: 102px;
    height: 35px;
    background: #58ab54;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    margin-left: 10px;
    margin-bottom: 20px;
    outline: none;
    border: 0;
`

const DetailViewDescBox = styled.div`
    padding: 5px;
    margin-top: 10px;
    line-height: 24px;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-bottom: 20px;
`

const DetailView = ({ id }) => {
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [code, setCode] = React.useState("")
  const [codeType, setCodeType] = React.useState("")
  const [isPass, setIsPass] = React.useState(false)
  // const [commentList, setCommentList] = React.useState([])
  const [notFoundFlag, setNotFoundFlag] = React.useState(0)
  const [startMonentString, setStartMonentString] = React.useState("")

  const getSubject = () => {
    get(`/api/v1/subjects/ms/${id}`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token")
      }
    })
      .then(response => {
        setTitle(response.data.title)
        setDesc(response.data.description)
        setCodeType(response.data.codeType)
        setIsPass(response.data.isPass)
        let startMonent = moment(response.data.createdDate)
          .tz("Asia/Seoul")
          .format("YYYY.MM.DD HH:mm")
        setStartMonentString(startMonent)
      })
      .catch(error => {
        if (error.response.status === 503) {
          alert("????????? ?????? ????????????. ?????? ???????????? ??????????????????.")
        } else if (error.response.status === 401) {
          if (error.response.data === "") {
            redirect("/login")
          } else if (error.response.data.message === "[ERROR] You are not join this Team, check your team list") {
            redirect("/setting")
          }
        } else if (error.response.status === 404) {
          alert("?????? ???????????? ?????????????????????.")
        } else {
          alert("??? ??? ?????? ????????? ?????????????????????. ?????? ???????????? ??????????????????.")
        }
        setNotFoundFlag(1)
      })
  }

  const registSubject = () => {
    post(`/api/v1/subjects/ss/register`, {
      body: {
        "subjectId": id,
        "testCode": code,
        "codeType": codeType
      },
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token")
      }
    })
      .then(response => {
        if (response.data.result === "SUCCESS") {
          alert("????????? ??????")
          setIsPass(true)
        } else {
          alert(`????????? ?????? \n${response.data.message}`)
        }
      })
      .catch(error => {
        if (error.response.status === 503) {
          alert("????????? ?????? ????????????. ?????? ???????????? ??????????????????.")
        } else if (error.response.status === 401) {
          if (error.response.data === "") {
            redirect("/login")
          } else if (error.response.data.message === "[ERROR] You are not join this Team, check your team list") {
            redirect("/setting")
          }
        } else {
          alert("??? ??? ?????? ????????? ?????????????????????. ?????? ???????????? ??????????????????.")
        }
      })
  }

  React.useEffect(() => {
    getSubject()
  }, [])

  return (
    <DetailViewContainer>
      <Header name="Subject" redirectURL="/setting"></Header>
      {notFoundFlag === 0 &&
        <DetailViewWrapper>
          <DetailViewTitleWrapper>
            <DetailViewTitleBox>
              {title}
            </DetailViewTitleBox>
            <PassIcon isPass={isPass} />
            <CodeIcon codeType={codeType} />
          </DetailViewTitleWrapper>
          <DetailViewTimeBox>{startMonentString}</DetailViewTimeBox>
          <DetailViewBox>
            <DescriptionWrapper>
              <DetailViewDescBox>
                {
                  desc.split('\n').map((text, index) => {
                    return (<span key={index}>{text}<br /></span>)
                  })
                }
              </DetailViewDescBox>
            </DescriptionWrapper>
            <CodeEditerWrapper>
              <Editor
                disabled={false}
                code={code}
                setCode={setCode}
                codeType={codeType}
                minHeight="400px"
              />
            </CodeEditerWrapper>
          </DetailViewBox>
          <DetailViewEditBox>
            <RegistButton onClick={() => { redirect(`/subject/grade/${id}`) }}>????????????</RegistButton>
            <RegistButton onClick={registSubject}>????????????</RegistButton>
          </DetailViewEditBox>
          {/* <Comment commentList={commentList} setCommentList={setCommentList} boardId={id}></Comment> */}
        </DetailViewWrapper>
      }
      {notFoundFlag === 1 && <NotFound name="???????????? ???????????? ?????? ??? ????????????" />}
      <Middle isEdit={false} />
      <Footer />
    </DetailViewContainer>
  );
}

export default DetailView