import { post } from '../../../../../utils/api';
import { redirect } from '../../../../../utils/redirect';
import { getCookie } from '../../../../../utils/cookie';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../../components/header'
import Middle from '../../../../../components/middle'
import Footer from '../../../../../components/footer'
import TeamWrite from '../../../../../components/teamwrite';

const NewTeamViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const EditView = () => {
  const uploadNewTeam = (title, desc) => {
    if (title.replace(/\s/g, "") === "") {
      alert("제목을 입력해주세요")
      return
    }

    if (desc.replace(/\s/g, "") === "") {
      alert("본문을 입력해주세요")
      return
    }

    setTeam({
      teamName: title,
      description: desc,
    })
  }

  const setTeam = (payload) => {
    post(`/api/v1/teams/ps`, {
      body: payload,
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token"),
      }
    })
      .then(response => {
        alert("새로운 팀을 등록하셨습니다")
        redirect("/setting")
      }).catch(error => {
        if (error.response.status === 503) {
          alert("시스템 준비 중입니다. 아래 이메일로 문의해주세요.")
        } else if (error.response.status === 401) {
          redirect("/login")
        } else {
          alert("팀 등록에 실패하였습니다. 아래 이메일로 문의해주세요.")
        }
      })
  }

  return (
    <NewTeamViewContainer>
      <Header name="New Team"></Header>
      <TeamWrite
        clickToUploadAction={uploadNewTeam}
        initTitle=""
        initDesc=""
        buttonName="새 팀 등록"
      ></TeamWrite>
      <Middle isEdit={false} postTitle="" />
      <Footer />
    </NewTeamViewContainer>
  );
}

export default EditView