import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

const SearchBarStyled = styled.input`
    background-image: url('/assets/icons/search.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 10px center;
    padding-left: 40px;
`;

const SearchBar = (props) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setInputValue(props.searchText);
    }, [props]);

    const handleChange = (e) => {
        setInputValue(e.target.value);
        props.onSearch(e.target.value);
    };

    return (
        <SearchBarStyled
            className={`form-control ${props.className}`}
            type="text"
            onChange={(e) => handleChange(e)}
            value={inputValue}
            placeholder={props.placeholder}
        />
    );
};

export default SearchBar;
