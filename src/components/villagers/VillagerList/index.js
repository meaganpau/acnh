import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import VillagerCard from '../VillagerCard';
import VillagerFilter from '../VillagerFilter';
import VillagerSearch from '../VillagerSearch';
import ContentContainer from '../../global/ContentContainer';

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FilterContainer = styled.div`
    max-width: 800px;
    margin: 0 auto 20px;
`;

const Button = styled.button`
    margin: 0 auto;
    background-color: ${(props) => props.theme.colors.darkBlue};
    color: #fff;
`;

const Label = styled.label`
    margin-top: 20px;

    p {
        margin: 0;
        margin-right: 10px;
        font-weight: 500;
    }
`;

const defaultFilter = {
    name: '',
    personality: '',
    species: '',
    sex: '',
};

const VillagerList = ({
    villagers,
    loadingVillagers,
    handleAddVillager,
    handleRemoveVillager,
    favouriteVillagers,
}) => {
    const [villagersList, setVillagersList] = useState([]);
    const [filterObj, setFilterObj] = useState(defaultFilter);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setVillagersList(villagers);
    }, [villagers]);

    // filterObj is mutated in place (not replaced via setFilterObj), so its
    // reference never changes and adding it here wouldn't re-run this
    // effect any differently. handleFilter is passed down from the parent
    // without useCallback, so its reference changes every parent render —
    // adding it would re-fire this effect on every parent render, not just
    // when searchTerm changes.
    useEffect(() => {
        filterObj.name = searchTerm;
        handleFilter(filterObj);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilterObj(defaultFilter);
    };

    const multiFilter = (arr, filters) => {
        const filterKeys = Object.keys(filters);
        return arr.filter((eachObj) => {
            return filterKeys.every((eachKey) => {
                if (!filters[eachKey].length) {
                    return true;
                }
                if (eachKey === 'name') {
                    return eachObj[eachKey]
                        .toLowerCase()
                        .includes(filters[eachKey].toLowerCase());
                }
                return filters[eachKey].includes(eachObj[eachKey]);
            });
        });
    };

    const handleFilter = (obj) => {
        setFilterObj(obj);
        const filteredVillagers = multiFilter(villagers, obj);
        setVillagersList(filteredVillagers);
    };

    return (
        <ContentContainer tabs={true}>
            <FilterContainer>
                <Label>
                    <p>Search:</p>
                    <VillagerSearch
                        handleSearch={handleSearch}
                        searchText={searchTerm}
                    />
                </Label>
                <VillagerFilter
                    handleFilter={handleFilter}
                    currentFilter={filterObj}
                />
                <Button onClick={clearFilters} className="btn btn-md">
                    Clear Filters
                </Button>
            </FilterContainer>
            {villagersList.length ? (
                <List>
                    {villagersList.map((villager) => (
                        <VillagerCard
                            key={villager.name}
                            villager={villager}
                            handleAddVillager={handleAddVillager}
                            handleRemoveVillager={handleRemoveVillager}
                            favouriteVillagers={favouriteVillagers}
                        />
                    ))}
                </List>
            ) : loadingVillagers ? (
                'Loading...'
            ) : (
                'No villagers found :('
            )}
        </ContentContainer>
    );
};

export default VillagerList;
