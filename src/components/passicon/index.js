import React from 'react'
import styled from 'styled-components';

const PassViewIcon = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25px;
    padding-left: 4px;
    padding-right: 4px;
    margin-left: 20px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: bold;
    font-family: Noto Sans KR;
    color: #ffffff;
    background-color: ${props => {
    return props.isPass ? "#58ab54" : "#d50000"
  }};
`

const PassIcon = ({ isPass }) => {
  return (<PassViewIcon isPass={isPass}>{isPass ? "통과" : "미통과"}</PassViewIcon>);
}

export default PassIcon