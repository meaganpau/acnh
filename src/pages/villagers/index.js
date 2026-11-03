import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import VillagerList from '../../components/villagers/VillagerList';
import PageContainer from '../../components/global/PageContainer';
import Title, { Logo } from '../../components/global/Title';
import SubTitle from '../../components/global/Subtitle';
import Tabs from '../../components/global/Tabs';
import VillagerContext from '../../context/villagers';
import FavouritesList from '../../components/villagers/FavouritesList';
import { fetchCached, getCached } from '../../util/apiCache';

const VillagerListTab = styled.div`
    display: ${(props) => {
        return props.show ? 'block' : 'none';
    }};
`;

const FavouritesListTab = styled.div`
    display: ${(props) => (props.show ? 'block' : 'none')};
`;

const VILLAGERS_URL = '/api/villagers';

const loadFavourites = () =>
    JSON.parse(localStorage.getItem('favoriteVillagers')) || [];

const Villagers = (className) => {
    // Start with cached data if we have it
    const [data, setData] = useState(() => getCached(VILLAGERS_URL) || null);
    const [villagersError, setVillagersError] = useState(false);
    const [currentTab, setCurrentTab] = useState('villagers');
    // Favourites need villager data, so load them together
    const [favouriteVillagers, setFavouriteVillagers] = useState(() =>
        getCached(VILLAGERS_URL) ? loadFavourites() : []
    );

    const villagers = useMemo(
        () =>
            data ? [...data].sort((a, b) => a.name.localeCompare(b.name)) : [],
        [data]
    );
    const villagersObj = useMemo(
        () => Object.fromEntries(villagers.map((v) => [v.name, v])),
        [villagers]
    );
    const loadingVillagers = !data && !villagersError;

    useEffect(() => {
        if (getCached(VILLAGERS_URL)) {
            return;
        }
        // Ignore results that arrive after leaving the page
        let active = true;
        fetchCached(VILLAGERS_URL)
            .then((json) => {
                if (!active) return;
                setData(json);
                setFavouriteVillagers(loadFavourites());
            })
            .catch((err) => {
                console.log(err);
                if (active) setVillagersError(true);
            });
        return () => {
            active = false;
        };
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
        villagers.splice(villagers.indexOf(villagerName), 1);
        setFavouriteVillagers(villagers);
        localStorage.setItem('favoriteVillagers', JSON.stringify(villagers));
    };

    const activeTab = (tabName) => (tabName === currentTab ? 'active' : '');

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
                            className={`nav-link ${activeTab('villagers')}`}
                            href="# "
                            onClick={(e) => handleTabChange(e, 'villagers')}
                        >
                            Villagers List
                        </a>
                    </li>
                    <li className="nav-item">
                        <a
                            className={`nav-link ${activeTab('favourites')}`}
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
                        villagersError={villagersError}
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
