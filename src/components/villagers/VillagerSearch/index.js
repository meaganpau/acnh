import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import SearchBar from '../../global/SearchBar';
import useDebounce from '../../../util/debounce';
import { event } from '../../../util/gtag';

const StyledSearchBar = styled(SearchBar)`
    width: 400px;
    margin: 0 auto;
`;

const VillagerSearch = ({ handleSearch, searchText }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const debouncedSearchTerm = useDebounce(searchTerm, 1000);

    useEffect(() => {
        if (debouncedSearchTerm) {
            event({
                action: 'Search',
                category: 'Villager',
                label: debouncedSearchTerm,
            });
        }
    }, [debouncedSearchTerm]);

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
