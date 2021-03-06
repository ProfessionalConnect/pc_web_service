import { get } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import moment from 'moment-timezone';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../components/header'
import Middle from '../../../../components/middle'
import Footer from '../../../../components/footer'
import { getCookie } from '../../../../utils/cookie';
import PageBar from '../../../../components/pagebar'
import PassIcon from '../../../../components/icon/passicon'
import CodeIcon from '../../../../components/icon/codeicon'

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const PreviewTitle = styled.div`
    font-weight: bold;
    font-size: 28px;
    font-family: Noto Sans KR;
`

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 600px;
    margin-top: 80px;
    margin-bottom: auto;
`

const NoContentElement = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #807f89;
    font-size: 28px;
    font-family: Noto Sans KR;
`

const BoardElement = styled.div`
    display: flex;
    flex-direction: row;
    overflow: hidden;
    margin-bottom: 60px;
`

const BoardThumbail = styled.img`
    width: 140px;
    height: 140px;
    margin-right: 24px;
    background: #D7DBD1;
`

const BoardBody = styled.div`
    display: flex;
    flex-direction: column;
`

const BoardTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const BoardTitle = styled.div`
    display: flex;
    flex-direction: row;
    font-weight: bold;
    font-size: 20px;
    font-family: Noto Sans KR;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const BoardUser = styled.div`
    color: #807f89;
    font-weight: bold;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const BoardTime = styled.div`
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const BoardDesc = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 55px;
    max-width: 550px;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-bottom: 20px;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const BoardButton = styled.button`
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

const Preview = ({ id }) => {
  const [subjects, setSubjects] = React.useState(null)
  const [totalPage, setTotalPage] = React.useState(0)
  const [page, setPage] = React.useState(0)
  const [role, setRole] = React.useState(getCookie("role"))

  const getSubjects = () => {
    get(`/api/v1/subjects/ms/teams/${id}?page=${page}`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token"),
      }
    })
      .then(response => {
        setTotalPage(response.data.totalPages)
        if (response.data.numberOfElements !== 0) {
          setSubjects(response.data.content)
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
    getSubjects()
  }, [page])

  return (
    <PreviewContainer>
      <Header name="ProConnect" redirectURL="/setting"></Header>
      <PreviewTitle>
        ?????? ??????
      </PreviewTitle>
      <BoardContainer>
        {subjects && subjects.map((element, index) => {
          const id = element.id
          const user = element.user
          // var thumbnailUrl = element.thumbnailUrl
          var startMonent = moment(element.createdDate)
            .tz("Asia/Seoul")
            .format("YYYY.MM.DD HH:mm")
          // if (thumbnailUrl === null || thumbnailUrl === "") {
          //   thumbnailUrl = "default.png"
          // }

          return (
            <BoardElement key={index}>
              <BoardThumbail
                src={`${process.env.PUBLIC_URL}/default.png`}
              />
              <BoardBody>
                <BoardTitleWrapper>
                  <BoardTitle>{element.title}</BoardTitle>
                  {role === "MEMBER" && <PassIcon isPass={element.isPass} />}
                  <CodeIcon codeType={element.codeType} />
                </BoardTitleWrapper>
                {user && (<BoardUser>{user.nickname} ??????</BoardUser>)}
                <BoardTime>{startMonent}</BoardTime>
                <BoardDesc>{element.description}</BoardDesc>
                <ButtonWrapper>
                  {role === "PRO" && <BoardButton onClick={() => { alert("??????????????????") }}>?????? ??????</BoardButton>}
                  {role === "PRO" && <BoardButton
                    style={{ marginLeft: "10px" }}
                    onClick={() => { redirect(`/subject/grade/${id}`) }}>
                    ?????? ?????? ??????
                  </BoardButton>}
                  {role !== "PRO" && <BoardButton onClick={() => { redirect(`/subject/${id}`) }}>?????? ??????</BoardButton>}
                </ButtonWrapper>
              </BoardBody>
            </BoardElement>
          )
        })}
        {
          (!subjects || subjects.length === 0) && (
            <NoContentElement>
              ???????????? ????????????.
            </NoContentElement>
          )
        }
        {totalPage !== 0 && <PageBar page={page} setPage={setPage} totalPage={totalPage}></PageBar>}
      </BoardContainer>
      <Middle isEdit={role === "PRO"} redirectURL={`/new/subject/${id}`} postTitle="Subject" />
      <Footer />
    </PreviewContainer>
  );
}

export default Preview