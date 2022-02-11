import { get, _delete } from '../../../../utils/api';
import { redirect } from '../../../../utils/redirect';
import moment from 'moment-timezone';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../components/header'
import Middle from '../../../../components/middle'
import Footer from '../../../../components/footer'
import NotFound from '../../../../components/notfound'
import Comment from '../comment'

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
`

const DetailViewEditElement = styled.div`
    margin-right: 4px;
    margin-left: 4px;
    cursor: pointer;
`

const DetailViewDescBox = styled.div`
    padding: 5px;
    margin-top: 10px;
    line-height: 24px;
    word-wrap: break-word;
    white-space: pre-wrap;
    color: #807f89;
    font-size: 16px;
    font-family: Noto Sans KR;
    margin-bottom: 20px;
`

const DetailView = ({ id }) => {
  const [title, setTitle] = React.useState("")
  const [desc, setDesc] = React.useState("")
  const [commentList, setCommentList] = React.useState([])
  const [notFoundFlag, setNotFoundFlag] = React.useState(0)
  const [startMonentString, setStartMonentString] = React.useState("")

  const getBoard = () => {
    get(`/api/v1/boards/${id}`, {})
      .then(response => {
        setTitle(response.data.title)
        setDesc(response.data.body)
        setCommentList(response.data.comments)
        let startMonent = moment(response.data.createdDate)
          .tz("Asia/Seoul")
          .format("YYYY.MM.DD HH:mm")
        setStartMonentString(startMonent)
      })
      .catch(error => {
        setNotFoundFlag(1)
      })
  }

  const deleteBoard = () => {
    if (window.confirm("이 글을 완전히 삭제합니다. 계속하시겠습니까?") === false) {
      return
    }

    _delete(`/api/v1/boards/${id}`, {})
      .then(response => {
        alert("요청하신 게시물을 삭제하였습니다")
        redirect("/main")
      })
      .catch(error => {
        alert("삭제에 실패하였습니다")
      })
  }

  React.useEffect(() => {
    getBoard()
  }, [])

  return (
    <DetailViewContainer>
      <Header name="Post"></Header>
      {notFoundFlag === 0 &&
        <DetailViewWrapper>
          <DetailViewTitleBox>
            {title}
          </DetailViewTitleBox>
          <DetailViewTimeBox>{startMonentString}</DetailViewTimeBox>
          <DetailViewEditBox>
            <DetailViewEditElement onClick={() => { redirect(`/post/${id}`) }}>수정</DetailViewEditElement>
            |
            <DetailViewEditElement onClick={deleteBoard}>삭제</DetailViewEditElement>
          </DetailViewEditBox>
          <DetailViewDescBox>
            {
              desc.split('\n').map((text, index) => {
                return (<span key={index}>{text}<br /></span>)
              })
            }
          </DetailViewDescBox>
          <Comment commentList={commentList} setCommentList={setCommentList} boardId={id}></Comment>
        </DetailViewWrapper>}
      {notFoundFlag === 1 && <NotFound name="요청하신 게시글을 찾을 수 없습니다" />}
      <Middle isEdit={false} />
      <Footer />
    </DetailViewContainer>
  );
}

export default DetailView