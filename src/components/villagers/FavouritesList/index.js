import React from 'react';
import ContentContainer from '../../global/ContentContainer';
import VillagerContext from '../../../context/villagers';
import VillagerCard from '../VillagerCard';
import styled from '@emotion/styled';

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const FavouritesList = ({ handleRemoveVillager, favouriteVillagers }) => {
    return (
        <ContentContainer tabs={true}>
            <List>
                <VillagerContext.Consumer>
                    {(context) => {
                        return favouriteVillagers.map((villager) => {
                            return (
                                <VillagerCard
                                    key={context[villager].name}
                                    villager={context[villager]}
                                    favouriteVillagers={favouriteVillagers}
                                    handleRemoveVillager={handleRemoveVillager}
                                />
                            );
                        });
                    }}
                </VillagerContext.Consumer>
            </List>
        </ContentContainer>
    );
};

export default FavouritesList;
