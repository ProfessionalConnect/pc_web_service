import { get } from '../../../../../utils/api';
import { redirect } from '../../../../../utils/redirect';
import moment from 'moment-timezone';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../../components/header'
import Middle from '../../../../../components/middle'
import Footer from '../../../../../components/footer'
import { getCookie } from '../../../../../utils/cookie';
import { deepCopyList } from '../../../../../utils/util';
import PageBar from '../../../../../components/pagebar'
import PassIcon from '../../../../../components/icon/passicon'
import CodeIcon from '../../../../../components/icon/codeicon'
import Editor from '../../../../../components/editor'

const GradeViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const GradeViewTitle = styled.div`
    font-weight: bold;
    font-size: 28px;
    font-family: Noto Sans KR;
`

const GradeViewWrapper = styled.div`
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

const GradeViewElement = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #dddddd;
    padding: 4px;
    border-radius: 5px;
    margin-bottom: 4px;
`

const GradeViewTitleWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const GradeViewResult = styled.div`
    display: flex;
    flex-direction: row;
    font-weight: bold;
    font-size: 18px;
    font-family: Noto Sans KR;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const GradeViewUser = styled.div`
    color: #807f89;
    font-weight: bold;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const GradeViewTime = styled.div`
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const CodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
`

const GradeViewIcon = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 20px;
    cursor: pointer;
`

const GradeView = ({ id }) => {
  const [grades, setGrades] = React.useState(null)
  const [totalPage, setTotalPage] = React.useState(0)
  const [codeFlags, setCodeFlags] = React.useState(null)
  const [role, setRole] = React.useState(getCookie("role"))
  const [page, setPage] = React.useState(0)

  const getGrades = () => {
    let rolePath = "ss"

    if (role === "PRO") {
      rolePath = "ps"
    }

    get(`/api/v1/subjects/${rolePath}/${id}/grades?page=${page}`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token"),
      }
    })
      .then(response => {
        setTotalPage(response.data.totalPages)
        if (response.data.numberOfElements !== 0) {
          initCodeFlags(response.data.content)
          setGrades(response.data.content)
        }
      })
      .catch(error => {
        if (error.response.status === 503) {
          alert("시스템 준비 중입니다. 아래 이메일로 문의해주세요.")
        } else if (error.response.status === 401) {
          if (error.response.data === "") {
            redirect("/login")
          } else if (error.response.data.message === "[ERROR] You are not join this Team, check your team list") {
            redirect("/setting")
          }
        } else {
          alert("알 수 없는 오류가 발생하였습니다. 아래 이메일로 문의해주세요.")
        }
      })
  }

  const initCodeFlags = (gradeList) => {
    let newCodeFlags = []
    for (let _grade of gradeList) {
      newCodeFlags.push(false)
    }
    setCodeFlags(newCodeFlags)
  }

  const setFlags = (index) => {
    let newCodeFlags = deepCopyList(codeFlags)
    newCodeFlags[index] = !newCodeFlags[index]
    setCodeFlags(newCodeFlags)
  }

  React.useEffect(() => {
    getGrades()
  }, [page])

  return (
    <GradeViewContainer>
      {role === "PRO" && <Header name="Subject Grade" redirectURL={`/setting`}></Header>}
      {role !== "PRO" && <Header name="Subject Grade" redirectURL={`/subject/${id}`}></Header>}
      <GradeViewTitle>
        과제 제출 목록
      </GradeViewTitle>
      <GradeViewWrapper>
        {grades && grades.map((element, index) => {
          const id = element.id
          const user = element.user
          var startMonent = moment(element.createdDate)
            .tz("Asia/Seoul")
            .format("YYYY.MM.DD HH:mm")

          return (
            <GradeViewElement key={index}>
              <GradeViewTitleWrapper>
                <GradeViewResult>{element.resultType}</GradeViewResult>
                <PassIcon isPass={element.resultType === "SUCCESS"} />
                <CodeIcon codeType={element.codeType} />
              </GradeViewTitleWrapper>
              {user && <GradeViewUser>{user.nickname} 학생</GradeViewUser>}
              <ButtonWrapper>
                <GradeViewTime>{startMonent}</GradeViewTime>
                {codeFlags && codeFlags[index] &&
                  <GradeViewIcon
                    src={`${process.env.PUBLIC_URL}/icn_up.png`}
                    onClick={() => { setFlags(index) }}
                  />}
                {codeFlags && !codeFlags[index] &&
                  <GradeViewIcon
                    src={`${process.env.PUBLIC_URL}/icn_down.png`}
                    onClick={() => { setFlags(index) }}
                  />}
              </ButtonWrapper>
              {codeFlags && codeFlags[index] && <CodeWrapper>
                <Editor
                  disabled={true}
                  code={element.testCode}
                  setCode={() => { }}
                  codeType={element.codeType}
                  minHeight="200px"
                />
              </CodeWrapper>}
            </GradeViewElement>
          )
        })}
        {
          (!grades || grades.length === 0) && (
            <NoContentElement>
              제출한 과제가 없습니다
            </NoContentElement>
          )
        }
        {totalPage !== 0 && <PageBar page={page} setPage={setPage} totalPage={totalPage}></PageBar>}
      </GradeViewWrapper>
      <Middle isEdit={false} redirectURL="" postTitle="" />
      <Footer />
    </GradeViewContainer>
  );
}

export default GradeView