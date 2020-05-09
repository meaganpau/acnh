import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import VillagerList from '../../components/villagers/VillagerList';
import PageContainer from '../../components/global/PageContainer';
import Title, { Logo } from '../../components/global/Title';
import SubTitle from '../../components/global/Subtitle';
import Tabs from '../../components/global/Tabs';
import VillagerContext from '../../context/villagers';
import FavouritesList from '../../components/villagers/FavouritesList';

const VillagerListTab = styled.div`
    display: ${(props) => {
        return props.show ? 'block' : 'none';
    }}};
`;

const FavouritesListTab = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
`;

const Villagers = (className) => {
    const [villagers, setVillagers] = useState([]);
    const [villagersObj, setVillagersObj] = useState({});
    const [loadingVillagers, setLoadingVillagers] = useState(true);
    const [currentTab, setCurrentTab] = useState('villagers');
    const [favouriteVillagers, setFavouriteVillagers] = useState([]);
    const [haveVillagers, setHaveVillagers] = useState([]);

    useEffect(() => {
        fetch('/api/villagers')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then((data) => {
                setVillagers(data.sort((a, b) => a.name.localeCompare(b.name)));
                const obj = {};
                data.forEach((villager) => {
                    obj[villager.name] = villager;
                });
                setVillagersObj(obj);
                setLoadingVillagers(false);
                const savedFav = JSON.parse(
                    localStorage.getItem('favoriteVillagers')
                );
                if (savedFav) {
                    setFavouriteVillagers(savedFav);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleTabChange = (e, tab) => {
        e.preventDefault();
        setCurrentTab(tab);
    };

    const handleAddVillager = (villagerName) => {
        const villagers = [...favouriteVillagers];
        villagers.push(villagerName);
        setFavouriteVillagers(villagers);
        localStorage.setItem('favoriteVillagers', JSON.stringify(villagers));
    };

    const handleRemoveVillager = (villagerName) => {
        const villagers = [...favouriteVillagers];
        villagers.splice(villagers.indexOf(villagerName), 1); // will return ['B'] and t is now equal to ['A', 'C', 'B']
        setFavouriteVillagers(villagers);
        localStorage.setItem('favoriteVillagers', JSON.stringify(villagers));
    };

    return (
        <VillagerContext.Provider value={villagersObj}>
            <PageContainer className={className}>
                <Title>
                    <Logo src="/logo192.png" alt="Critterdex Logo" />
                    Villagers
                </Title>
                <SubTitle>Find your favorite villagers in ACNH!</SubTitle>
                <Tabs>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${
                                currentTab === 'villagers' ? 'active' : ''
                            }`}
                            href="# "
                            onClick={(e) => handleTabChange(e, 'villagers')}
                        >
                            Villagers List
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${
                                currentTab === 'favourites' ? 'active' : ''
                            }`}
                            href="# "
                            onClick={(e) => handleTabChange(e, 'favourites')}
                        >
                            Favorites List
                        </a>
                    </li>
                </Tabs>
                <VillagerListTab show={currentTab === 'villagers'}>
                    <VillagerList
                        villagers={villagers}
                        favouriteVillagers={favouriteVillagers}
                        loadingVillagers={loadingVillagers}
                        handleAddVillager={handleAddVillager}
                        handleRemoveVillager={handleRemoveVillager}
                    />
                </VillagerListTab>
                <FavouritesListTab show={currentTab === 'favourites'}>
                    <FavouritesList
                        villagers={favouriteVillagers}
                        favouriteVillagers={favouriteVillagers}
                        handleRemoveVillager={handleRemoveVillager}
                    />
                </FavouritesListTab>
            </PageContainer>
        </VillagerContext.Provider>
    );
};

export default Villagers;
