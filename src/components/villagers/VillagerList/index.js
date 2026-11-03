import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import VillagerCard from '../VillagerCard';
import VillagerFilter from '../VillagerFilter';
import VillagerSearch from '../VillagerSearch';
import ContentContainer from '../../global/ContentContainer';
import Loading from '../../global/Loading';

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FilterContainer = styled.div`
    max-width: 800px;
    margin: 0 auto 20px;

    /* Search on its own row, the rest in pairs */
    @media screen and (max-width: 581px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 8px;
        margin-bottom: 10px;
    }
`;

const Button = styled.button`
    margin: 0 auto;
    background-color: ${(props) => props.theme.colors.darkBlue};
    color: #fff;

    @media screen and (max-width: 581px) {
        width: 100%;
    }
`;

const Label = styled.label`
    display: block;
    margin-top: 20px;

    p {
        margin: 0;
        margin-right: 10px;
        font-weight: 500;
    }

    @media screen and (max-width: 581px) {
        grid-column: 1 / -1;
        margin: 0;

        /* Hidden visually; the placeholder labels it */
        p {
            position: absolute;
            width: 1px;
            height: 1px;
            overflow: hidden;
            clip: rect(0 0 0 0);
            white-space: nowrap;
        }
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
    villagersError,
    handleAddVillager,
    handleRemoveVillager,
    favouriteVillagers,
}) => {
    // Start with props so cached villagers show on the first render
    const [villagersList, setVillagersList] = useState(villagers);
    const [filterObj, setFilterObj] = useState(defaultFilter);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setVillagersList(villagers);
    }, [villagers]);

    // Only re-run when the search term changes
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
                <Loading>Loading villagers...</Loading>
            ) : villagersError ? (
                "Couldn't load villagers. Please refresh and try again."
            ) : (
                'No villagers found :('
            )}
        </ContentContainer>
    );
};

export default VillagerList;
