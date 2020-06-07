import React from 'react';
import ContentContainer from '../../global/ContentContainer';
import VillagerContext from '../../../context/villagers';
import VillagerCard from '../VillagerCard';
import styled from '@emotion/styled';

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
`;

const Text = styled.p`
    margin: 10px auto;
`;

const FavouritesList = ({ handleRemoveVillager, favouriteVillagers }) => {
    return (
        <ContentContainer tabs={true}>
            <h2>Your Favorite Villagers</h2>
            <List>
                {favouriteVillagers.length ? (
                    <VillagerContext.Consumer>
                        {(context) => {
                            return favouriteVillagers.map((villager) => {
                                return (
                                    <VillagerCard
                                        key={context[villager].name}
                                        villager={context[villager]}
                                        favouriteVillagers={favouriteVillagers}
                                        handleRemoveVillager={
                                            handleRemoveVillager
                                        }
                                    />
                                );
                            });
                        }}
                    </VillagerContext.Consumer>
                ) : (
                    <Text>No favorite villagers yet :(</Text>
                )}
            </List>
        </ContentContainer>
    );
};

export default FavouritesList;
