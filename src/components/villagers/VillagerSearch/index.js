import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SearchBar from '../../global/SearchBar';

const StyledSearchBar = styled(SearchBar)`
    width: 400px;
    margin: 0 auto;
`;

const VillagerSearch = ({ handleSearch, searchText }) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setSearchTerm(searchText);
    }, [searchText]);

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        handleSearch(term);
    };

    return (
        <StyledSearchBar
            onSearch={handleSearchChange}
            searchText={searchTerm}
            placeholder="Search by Villager Name"
        />
    );
};

export default VillagerSearch;
