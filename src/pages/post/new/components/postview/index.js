import { postNoHeader } from '../../../../../utils/api';
import { redirect } from '../../../../../utils/redirect';
import { uploadFile } from '../../../../../utils/s3';
import React from 'react'
import styled from 'styled-components';
import Header from '../../../../../components/header'
import Middle from '../../../../../components/middle'
import Footer from '../../../../../components/footer'
import Write from '../../../../../components/write';

const PostViewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1000px;
    height: 100vh;
`

const PostView = () => {
  const uploadNewPost = (title, desc, file, url) => {
    if (title.replace(/\s/g, "") === "") {
      alert("제목을 입력해주세요")
      return
    }

    if (desc.replace(/\s/g, "") === "") {
      alert("본문을 입력해주세요")
      return
    }

    if (file === null) {
      postCallBoardsAction({
        title: title,
        body: desc
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
          alert("포스트 등록에 실패하였습니다. 아래 이메일로 문의해주세요.")
        })
    }
  }

  const postCallBoardsAction = (payload) => {
    postNoHeader(`/api/v1/boards`, {
      body: payload
    })
      .then(response => {
        alert("새로운 포스트를 등록하셨습니다")
        redirect("/main")
      }).catch(error => {
        alert("포스트 등록에 실패하였습니다. 아래 이메일로 문의해주세요.")
      })
  }

  return (
    <PostViewContainer>
      <Header name="New Post"></Header>
      <Write
        clickToUploadAction={uploadNewPost}
        initTitle=""
        initDesc=""
        initUrl={null}
        buttonName="작성하기"
      ></Write>
      <Middle isEdit={false} />
      <Footer />
    </PostViewContainer>
  );
}

export default PostView