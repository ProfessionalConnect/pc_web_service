import { putNoHeader, get } from '../../../../../utils/api';
import { redirect } from '../../../../../utils/redirect';
import { uploadFile } from '../../../../../utils/s3';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../../components/header'
import Middle from '../../../../../components/middle'
import Footer from '../../../../../components/footer'
import Write from '../../../../../components/write';
import NotFound from '../../../../../components/notfound'

const PostViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const PostView = ({ id }) => {
  const [title, setTitle] = React.useState(null)
  const [desc, setDesc] = React.useState(null)
  const [url, setUrl] = React.useState(null)
  const [notFoundFlag, setNotFoundFlag] = React.useState(0)

  const getBoard = () => {
    get(`/api/v1/boards/${id}`, {})
      .then(response => {
        setTitle(response.data.title)
        setDesc(response.data.body)
        setUrl(response.data.thumbnailUrl)
      })
      .catch(error => {
        setNotFoundFlag(1)
      })
  }

  const uploadOldPost = (title, desc, file, url) => {
    if (title.replace(/\s/g, "") === "") {
      alert("제목을 입력해주세요")
      return
    }

    if (desc.replace(/\s/g, "") === "") {
      alert("본문을 입력해주세요")
      return
    }

    if (file === null && url === null) {
      postCallBoardsAction({
        title: title,
        body: desc
      })
    } else if (file === null && url !== null) {
      postCallBoardsAction({
        title: title,
        body: desc,
        thumbnailUrl: url
      })
    } else {
      uploadFile(file)
        .then(url => {
          postCallBoardsAction({
            title: title,
            body: desc,
            thumbnailUrl: url
          })
        })
        .catch(error => {
          alert("포스트 수정에 실패하였습니다. 아래 이메일로 문의해주세요.")
        })
    }
  }


  const postCallBoardsAction = (payload) => {
    putNoHeader(`/api/v1/boards/${id}`, {
      body: payload
    })
      .then(response => {
        alert("포스트를 수정하셨습니다")
        redirect(`/board/${id}`)
      }).catch(error => {
        alert("포스트 수정에 실패하였습니다. 아래 이메일로 문의해주세요.")
      })
  }


  React.useEffect(() => {
    getBoard()
  }, [])

  return (
    <PostViewContainer>
      <Header name="Update Post"></Header>
      {notFoundFlag === 0 &&
        <Write
          clickToUploadAction={uploadOldPost}
          initTitle={title}
          initDesc={desc}
          initUrl={url}
          buttonName="수정하기"
        ></Write>
      }
      {notFoundFlag === 1 && <NotFound name="요청하신 게시글을 수정할 수 없습니다" />}
      <Middle isEdit={false} />
      <Footer />
    </PostViewContainer>
  );
}

export default PostView