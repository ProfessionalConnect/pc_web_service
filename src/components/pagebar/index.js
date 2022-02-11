import React from 'react'
import styled from 'styled-components';

const PageContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width: 100%;
`

const LeftPageButton = styled.img`
    width: 30px;
    height: 30px;
    cursor: ${props => {
    return props.act || ''
  }};
`

const RightPageButton = styled.img`
    width: 30px;
    height: 30px;
    cursor: ${props => {
    return props.act || ''
  }};
`

const FocusButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: white;
    font-size: 16px;
    font-family: Noto Sans KR;
    border-radius: 100px;
    background: #eca4a6;
    margin-left: 4px;
    margin-right: 4px;
`

const NotFocusButton = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: #807f89;
    font-size: 16px;
    font-family: Noto Sans KR;
    margin-left: 4px;
    margin-right: 4px;
    cursor: pointer;
`

const PageBar = ({ page, setPage, totalPage }) => {

  const makePages = () => {
    let pages = []
    for (let i = 0; i < totalPage; i++) {
      pages.push(i)
    }
    return pages
  }

  const goPrevPage = () => {
    if (page > 0) {
      setPage(page - 1)
    }
  }

  const goNextPage = () => {
    if (page < totalPage - 1) {
      setPage(page + 1)
    }
  }

  const validateLeftCursor = () => {
    if (page === 0) {
      return ''
    }
    return 'pointer'
  }

  const validateRightCursor = () => {
    if (page === totalPage - 1) {
      return ''
    }
    return 'pointer'
  }

  return (
    <PageContainer>
      <LeftPageButton act={validateLeftCursor} src="/icn_chevron_left.png" onClick={goPrevPage}></LeftPageButton>
      {totalPage > 0 && makePages().map((element, index) => {
        if (element === page) {
          return (<FocusButton key={index}>{element + 1}</FocusButton>)
        }
        return (<NotFocusButton key={index} onClick={() => { setPage(element) }}>{element + 1}</NotFocusButton>)
      })}
      <RightPageButton act={validateRightCursor} src="/icn_chevron_right.png" onClick={goNextPage}></RightPageButton>
    </PageContainer>
  );
}

export default PageBar