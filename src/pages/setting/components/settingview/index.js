import { get, post } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../components/header'
import Middle from '../../../../components/middle'
import Footer from '../../../../components/footer'
import { getCookie } from '../../../../utils/cookie';
import { deepCopyList } from '../../../../utils/util';

const SettingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const SettingTitle = styled.div`
    font-weight: bold;
    font-size: 28px;
    font-family: Noto Sans KR;
`

const CodeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`

const CodeInput = styled.input`
    border: none;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 0 none;
    line-height: 30px;
    overflow: hidden;
`

const CodeButton = styled.button`
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

const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 800px;
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

const TeamElement = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 40px;
    padding-right: 40px;
    justify-content: space-between;
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid #dddddd;
    border-radius: 5px;
`

const TeamThumbail = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 24px;
`

const TeamBody = styled.div`
    display: flex;
    flex-direction: row;
`

const TeamTitle = styled.div`
    display: flex;
    flex-direction: row;
    font-weight: bold;
    font-size: 18px;
    font-family: Noto Sans KR;
    line-height: 34px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 8px 0 0 0;
`

const TeamButtonWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const TeamButton = styled.button`
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

const SettingView = () => {
  const [teams, setTeams] = React.useState(null)
  const [code, setCode] = React.useState(null)
  const [role, setRole] = React.useState(getCookie("role"))

  const getTeams = () => {
    get(`/api/v1/teams/ms`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token")
      }
    })
      .then(response => {
        let teamList = []
        for (let team of response.data) {
          teamList.push(team)
        }
        setTeams(teamList)
      })
      .catch(error => {
        if (error.response.status === 500) {
          alert("????????? ?????? ????????????. ?????? ???????????? ??????????????????.")
        } else if (error.response.status === 401) {
          redirect("/login")
        } else {
          alert("??? ??? ?????? ????????? ?????????????????????. ?????? ???????????? ??????????????????.")
        }
      })
  }

  const joinTeam = () => {
    let rolePath = "ss"

    if (role === "PRO") {
      rolePath = "ps"
    }

    post(`/api/v1/teams/${rolePath}/join`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token"),
        "teamToken": code
      }
    })
      .then(response => {
        alert("??? ????????? ?????????????????????.")
        let newTeams = deepCopyList(teams)
        newTeams.push(response.data)
        setTeams(newTeams)
      })
      .catch(error => {
        if (error.response.status === 503) {
          alert("????????? ?????? ????????????. ?????? ???????????? ??????????????????.")
        } else if (error.response.status === 401) {
          redirect("/login")
        } else {
          alert("??? ??? ?????? ????????? ?????????????????????. ?????? ???????????? ??????????????????.")
        }
      })
  }

  const getTeamCode = (id) => {
    get(`/api/v1/teams/ps/${id}/token`, {
      headers: {
        "X-AUTH-TOKEN": getCookie("access_token")
      }
    })
      .then(response => {
        alert(`??? ??????: ${response.data.teamToken}`)
      })
      .catch(error => {
        if (error.response.status === 503) {
          alert("????????? ?????? ????????????. ?????? ???????????? ??????????????????.")
        } else if (error.response.status === 401) {
          redirect("/login")
        } else if (error.response.status === 404) {
          alert("????????? ????????????.")
        } else {
          alert("??? ??? ?????? ????????? ?????????????????????. ?????? ???????????? ??????????????????.")
        }
      })
  }

  const handleCode = (event) => {
    setCode(event.target.value)
  }

  React.useEffect(() => {
    getTeams()
  }, [])

  return (
    <SettingContainer>
      <Header name="ProConnect" redirectURL="/setting"></Header>
      <SettingTitle>
        ??? ??????
      </SettingTitle>
      <CodeWrapper>
        <CodeInput onChange={handleCode} placeholder="????????? ???????????????"></CodeInput>
        <CodeButton onClick={joinTeam}>?????? ?????? ??????</CodeButton>
      </CodeWrapper>
      <TeamContainer>
        {teams && teams.map((element, index) => {
          const id = element.id
          return (
            <TeamElement key={index}>
              <TeamBody>
                <TeamThumbail src={`${process.env.PUBLIC_URL}/icn_teams.png`} />
                <TeamTitle>{element.teamName}</TeamTitle>
              </TeamBody>
              <TeamButtonWrapper>
                <TeamButton onClick={() => { redirect(`/team/${id}`) }}>??????</TeamButton>
                {role === "PRO" && <TeamButton
                  style={{ marginLeft: "10px" }}
                  onClick={() => { getTeamCode(id) }}>
                  ??? ?????? ??????
                </TeamButton>}
              </TeamButtonWrapper>
            </TeamElement>
          )
        })}
        {
          (!teams || teams.length === 0) && (
            <NoContentElement>
              ?????? ?????? ?????? ????????????.
            </NoContentElement>
          )
        }
      </TeamContainer>
      <Middle isEdit={role === "PRO"} redirectURL="/new/team" postTitle="Team" />
      <Footer />
    </SettingContainer>
  );
}

export default SettingView