import React from 'react'
import styled from 'styled-components';
import { deepCopyList } from '../../utils/util'

const TestCodeContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

const TestCodeWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 10px;
`

const AddButton = styled.img`
    width: 20px;
    height: 20px;
    background-color: #dddddd;
    cursor: pointer;
    border-radius: 100px;
`

const ElementBox = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const ElementTitle = styled.div`
    font-size: 12px;
    color: #202020;
    font-family: Noto Sans KR;
    margin-right: 6px;
    resize: none;
`

const TestCodeBox = styled.div`
    padding: 5px;
    border: 1px solid #dddddd;
    border-radius: 5px;
`

const TestCodeTextArea = styled.textarea`
    width: 180px;
    height: 20px;
    border: none;
    font-size: 14px;
    color: #202020;
    font-family: Noto Sans KR;
    outline: 0 none;
`

const TestCode = ({
  testArguments,
  setTestArguments,
}) => {
  const emptyArgument = {
    "testArgument": "",
    "matchResult": ""
  }

  React.useEffect(() => {
    setTestArguments([emptyArgument])
  }, [])

  const addTestArgument = () => {
    let newTestArguments = deepCopyList(testArguments)
    newTestArguments.push(emptyArgument)
    setTestArguments(newTestArguments)
  }

  return (
    <TestCodeContainer>
      {testArguments && testArguments.map((element, index) => {

        const handleMatchResult = (event) => {
          let newTestArguments = deepCopyList(testArguments)
          newTestArguments[index].matchResult = event.target.value
          setTestArguments(newTestArguments)
        }

        const handleTestArgument = (event) => {
          let newTestArguments = deepCopyList(testArguments)
          newTestArguments[index].testArgument = event.target.value
          setTestArguments(newTestArguments)
        }

        return (
          <TestCodeWrapper key={index}>
            <ElementBox>
              <ElementTitle>아규먼트</ElementTitle>
              <TestCodeBox>
                <TestCodeTextArea
                  onChange={handleTestArgument}
                  placeholder="아규먼트를 입력하세요"
                />
              </TestCodeBox>
            </ElementBox>
            <ElementBox>
              <ElementTitle>정답</ElementTitle>
              <TestCodeBox>
                <TestCodeTextArea
                  onChange={handleMatchResult}
                  placeholder="정답 값을 입력하세요"
                />
              </TestCodeBox>
            </ElementBox>
            <AddButton
              src={`${process.env.PUBLIC_URL}/icn_add_white.png`}
              onClick={addTestArgument}
            />
          </TestCodeWrapper>
        )
      })}
    </TestCodeContainer>
  );
}

export default TestCode