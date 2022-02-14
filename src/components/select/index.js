import React from 'react'
import styled from 'styled-components';

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: ${(props) => props.marginBottom || "0px"};
`

const SelectTitle = styled.div`
    color: #807f89;
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-right: 20px;
`

const Selecter = styled.select`
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-right: 20px;
`

const Option = styled.option`
    font-size: 14px;
    font-family: Noto Sans KR;
    margin-right: 20px;
`

const Select = ({ options, defaultValue, title, setValue, styled }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <SelectContainer marginBottom={styled.marginBottom}>
      <SelectTitle>{title}</SelectTitle>
      <Selecter onChange={handleChange}>
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
            defaultValue={defaultValue === option.value}
          >
            {option.name}
          </Option>
        ))}
      </Selecter>
    </SelectContainer>
  );
};

export default Select;