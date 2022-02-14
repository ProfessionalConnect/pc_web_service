import React from 'react'
import styled from 'styled-components';

const SelectContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    align-items: center;
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

const Select = ({ options, defaultValue, title, setValue }) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <SelectContainer>
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