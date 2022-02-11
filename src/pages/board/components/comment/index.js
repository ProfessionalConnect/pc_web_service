import { postNoHeader, _delete } from '../../../../utils/api';
import moment from 'moment-timezone';
import React from 'react'
import styled from 'styled-components';

const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 60px;
`

const CommentPreBox = styled.div`
    display: flex;
    flex-direction: row;
    padding-bottom: 14px;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
`

const CommentPreTitle = styled.div`
    font-weight: bold;
    font-size: 18px;
    font-family: Noto Sans KR;
    margin-right: 6px;
`

const CommentPreBody = styled.div`
    font-weight: bold;
    font-size: 18px;
    font-family: Noto Sans KR;
    color: #eca4a6;
`

const CommentBox = styled.div`
    display: flex;
    flex-direction: column;
`

const CommentElement = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
`

const ReCommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 4px;
`

const ReCommentElement = styled.div`
    display: flex;
    flex-direction: row;
`

const ReCommentInfoBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

const CommentHeader = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 14px;
    color: #807f89;
`

const CommentNickname = styled.div`
    font-weight: bold;
    font-size: 14px;
    font-family: Noto Sans KR;
    color: #eca4a6;
    margin-right: 8px;
`

const CommentTime = styled.div`
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-left: 8px;
`

const CommentEditBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const CommentEditElement = styled.div`
    cursor: pointer;
    margin-left: 4px;
    margin-right: 4px;
`

const CommentIcon = styled.img`
    margin-top: 4px;
    margin-right: 4px;
    width: 26px;
    height: 26px;
`

const CommentBody = styled.div`
    font-weight: bold;
    font-size: 14px;
    font-family: Noto Sans KR;
`

const PostCommentContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    width: 100%;
`

const PostCommentPreBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    align-items: center;
    width: 100%;
`

const PostCommentPreTitle = styled.div`
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    margin-right: 10px;
`

const BodyTextArea = styled.textarea`
    height: 80px;
    border: solid 1px #eca4a6;
    border-raidus: 10px;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 1 1;
    line-height: 20px;
    overflow: hidden;
    padding: 10px;
`

const NicknameTextArea = styled.textarea`
    height: 20px;
    border: solid 1px #eca4a6;
    border-raidus: 10px;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 1 1;
    line-height: 20px;
    overflow: hidden;
    padding: 10px;
    margin-right: 10px;
`

const PasswordTextArea = styled.textarea`
    height: 20px;
    border: solid 1px #eca4a6;
    border-raidus: 10px;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    resize: none;
    outline: 1 1;
    line-height: 20px;
    overflow: hidden;
    padding: 10px;
`

const ButtonBox = styled.div`
    display: flex;
    flex-direction: row;
    margin-left: auto;
`

const ArrowButton = styled.img`
    width: 20px;
    height: 20px;
    margin-left: 20px;
    cursor: pointer;
`

const PostCommentButton = styled.button`
    width: 102px;
    height: 35px;
    background: #ff5000;
    color: white;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    cursor: pointer;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 20px;
    outline: none;
    border: 0;
`

const Comment = ({ commentList, setCommentList, boardId }) => {
  const [body, setBody] = React.useState("")
  const [nickname, setNickname] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [reCommentId, setReCommentId] = React.useState(null)
  const [reCommentIdList, setReCommentIdList] = React.useState([])

  const handleBody = (event) => {
    setBody(event.target.value)
  }

  const handleNickname = (event) => {
    setNickname(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const deepCopy = (datas) => {
    let copy = []
    for (let data of datas) {
      copy.push(data)
    }
    return copy
  }

  const getLocationToId = (response) => {
    let path = response.headers.location
    return parseInt(path.split("/")[3])
  }

  const pushRecommendId = (id) => {
    let copyList = deepCopy(reCommentIdList)
    copyList.push(id)
    setReCommentIdList(copyList)
  }

  const popRecommendId = (id) => {
    let copyList = deepCopy(reCommentIdList)
    let filtered = copyList.filter((element) => element !== id);
    setReCommentIdList(filtered)
  }

  const popCommentById = (id) => {
    let copyList = deepCopy(commentList)
    let filtered = copyList.filter((element) => element.id !== id);
    setCommentList(filtered)
  }

  const findIdHasChild = (id) => {
    for (let comment of commentList) {
      if (comment.parentId === id) {
        return true
      }
    }
    return false
  }

  const uploadComment = () => {
    if (nickname.replace(/\s/g, "") === "") {
      alert("닉네임을 입력해주세요")
      return
    }

    if (password.replace(/\s/g, "") === "") {
      alert("패스워드를 입력해주세요")
      return
    }

    if (body.replace(/\s/g, "") === "") {
      alert("댓글을 입력해주세요")
      return
    }


    let payloadBody = {
      boardId: boardId,
      parentId: reCommentId,
      nickname: nickname,
      password: password,
      body: body
    }

    postNoHeader(`/api/v1/comments`, { body: payloadBody })
      .then(response => {
        let newId = getLocationToId(response)
        payloadBody.id = newId
        payloadBody.createdDate = moment()
          .tz("Asia/Seoul")
          .format("YYYY.MM.DD HH:mm")
        let copyList = deepCopy(commentList)
        copyList.push(payloadBody)
        setCommentList(copyList)
      })
      .catch(error => {
        alert("댓글 등록에 실패하였습니다. 아래 이메일로 문의해주세요.")
      })
  }

  const deleteComment = (id) => {
    let password = window.prompt('댓글 등록 시 지정한 패스워드를 입력하세요', '')

    _delete(`/api/v1/comments/${id}`, { headers: { password: password } })
      .then(response => {
        alert("요청하신 댓글을 삭제하였습니다")
        popCommentById(id)
      })
      .catch(error => {
        alert("댓글 삭제에 실패하였습니다. 패스워드를 확인해주세요.")
      })
  }

  const getReComment = (parentId) => {
    let childCommentList = []
    for (let comment of commentList) {
      if (comment.parentId === parentId) {
        childCommentList.push(comment)
      }
    }

    if (childCommentList.length === 0) {
      return
    }

    return (
      <CommentBox style={{ marginLeft: `24px` }}>
        {reCommentIdList.includes(parentId) && childCommentList.map((element) => {
          const { id, nickname, body, createdDate } = element
          let startMonent = moment(createdDate)
            .tz("Asia/Seoul")
            .format("YYYY.MM.DD HH:mm")
          const childFlag = findIdHasChild(id)
          return (
            <ReCommentWrapper key={id}>
              <ReCommentElement >
                <CommentIcon src="/icn_right_arrow.png" />
                <ReCommentInfoBox>
                  <CommentHeader>
                    <CommentNickname>{nickname}</CommentNickname> |
                    <CommentTime>{startMonent}</CommentTime>
                    {childFlag && !reCommentIdList.includes(id) &&
                      <ArrowButton src="/icn_down.png" onClick={() => { pushRecommendId(id) }} />
                    }
                    {childFlag && reCommentIdList.includes(id) &&
                      <ArrowButton src="/icn_up.png" onClick={() => { popRecommendId(id) }} />
                    }
                    <CommentEditBox>
                      <CommentEditElement onClick={() => { deleteComment(id) }}>삭제</CommentEditElement>
                      |
                      <CommentEditElement onClick={() => { setReCommentId(id) }}>댓글달기</CommentEditElement>
                    </CommentEditBox>
                  </CommentHeader>
                  <CommentBody>{body}</CommentBody>
                  {getReComment(id)}
                </ReCommentInfoBox>
              </ReCommentElement>
              {id === reCommentId && getPostCommentView()}
            </ReCommentWrapper>
          )
        })
        }
      </CommentBox>
    )
  }

  const getPostCommentView = () => {
    return (
      <PostCommentContainer>
        <PostCommentPreBox>
          <PostCommentPreTitle>닉네임</PostCommentPreTitle>
          <NicknameTextArea
            onChange={handleNickname}
            placeholder="닉네임을 입력하세요"
          ></NicknameTextArea>
          <PostCommentPreTitle>패스워드</PostCommentPreTitle>
          <PasswordTextArea
            onChange={handlePassword}
            placeholder="패스워드를 입력하세요"
          ></PasswordTextArea>
        </PostCommentPreBox>
        <BodyTextArea
          onChange={handleBody}
          placeholder="댓글을 입력하세요"
        ></BodyTextArea>
        <ButtonBox>
          {reCommentId && <PostCommentButton onClick={() => { setReCommentId(null) }}>끄기</PostCommentButton>}
          <PostCommentButton onClick={uploadComment}>등록하기</PostCommentButton>
        </ButtonBox>
      </PostCommentContainer>
    )
  }

  return (
    <CommentContainer>
      <CommentPreBox>
        <CommentPreTitle>댓글</CommentPreTitle>
        <CommentPreBody>{commentList.length}</CommentPreBody>
      </CommentPreBox>
      <CommentBox>
        {commentList && commentList.map((element) => {
          const { id, parentId, nickname, body, createdDate } = element
          let startMonent = moment(createdDate)
            .tz("Asia/Seoul")
            .format("YYYY.MM.DD HH:mm")
          const childFlag = findIdHasChild(id)
          if (parentId !== null) {
            return;
          }
          return (
            <CommentElement key={id}>
              <CommentHeader>
                <CommentNickname>{nickname}</CommentNickname> |
                <CommentTime>{startMonent}</CommentTime>
                {childFlag && !reCommentIdList.includes(id) &&
                  <ArrowButton src="/icn_down.png" onClick={() => { pushRecommendId(id) }} />
                }
                {childFlag && reCommentIdList.includes(id) &&
                  <ArrowButton src="/icn_up.png" onClick={() => { popRecommendId(id) }} />
                }
                <CommentEditBox>
                  <CommentEditElement onClick={() => { deleteComment(id) }}>삭제</CommentEditElement>
                  |
                  <CommentEditElement onClick={() => { setReCommentId(id) }}>댓글달기</CommentEditElement>
                </CommentEditBox>
              </CommentHeader>
              <CommentBody>{body}</CommentBody>
              {getReComment(id)}
              {id === reCommentId && getPostCommentView()}
            </CommentElement>
          )
        })}
      </CommentBox>
      {!reCommentId && getPostCommentView()}
    </CommentContainer>
  );
}

export default Comment