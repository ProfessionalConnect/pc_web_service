import { post } from '../../../../../utils/api';
import { redirect } from '../../../../../utils/redirect';
import { getCookie } from '../../../../../utils/cookie';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../../components/header'
import Middle from '../../../../../components/middle'
import Footer from '../../../../../components/footer'
import SubjectWrite from '../../../../../components/subjectwrite';

const NewSubjectViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const EditView = ({ id }) => {
  const uploadNewSubject = (
    title,
    desc,
    correctCode,
    codeType,
    testArguments
  ) => {
    if (title.replace(/\s/g, "") === "") {
      alert("제목을 입력해주세요")
      return
    }

    if (desc.replace(/\s/g, "") === "") {
      alert("본문을 입력해주세요")
      return
    }

    if (codeType.replace(/\s/g, "") === "") {
      alert("코드 타입을 선택해주세요")
      return
    }

    for (let testArgument of testArguments) {
      if (testArgument.matchResult.replace(/\s/g, "") === "") {
        alert("테스트 코드 정답이 누락되었습니다")
        return
      }

      if (testArgument.testArgument.replace(/\s/g, "") === "") {
        alert("테스트 코드 인자값이 누락되었습니다")
        return
      }
    }

    setSubject({
      teamId: id,
      title: title,
      description: desc,
      correctCode: correctCode,
      codeType: codeType,
      testArguments: testArguments
    })
  }

  const setSubject = (payload) => {
    post(`/api/v1/subjects/ps`, {
      body: payload,
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token"),
      }
    })
      .then(response => {
        alert("새로운 과제를 등록하셨습니다")
        redirect(`/team/${id}`)
      }).catch(error => {
        if (error.response.status === 503) {
          alert("시스템 준비 중입니다. 아래 이메일로 문의해주세요.")
        } else if (error.response.status === 401) {
          redirect("/login")
        } else {
          alert("알 수 없는 오류가 발생하였습니다. 아래 이메일로 문의해주세요.")
        }
      })
  }

  return (
    <NewSubjectViewContainer>
      <Header name="New Subject" redirectURL={`/team/${id}`}></Header>
      <SubjectWrite
        clickToUploadAction={uploadNewSubject}
        initTitle=""
        initDesc=""
        initCodeType="CPP"
        buttonName="과제 등록"
      ></SubjectWrite>
      <Middle isEdit={false} />
      <Footer />
    </NewSubjectViewContainer>
  );
}

export default EditView