import React, { useEffect, useState } from 'react';
import VillagerList from '../../components/villagers/VillagerList';
import PageContainer from '../../components/global/PageContainer';
import Title, { Logo } from '../../components/global/Title';
import SubTitle from '../../components/global/Subtitle';

const Villagers = () => {
    const [villagers, setVillagers] = useState([]);
    const [loadingVillagers, setLoadingVillagers] = useState(true);

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
                data.sort((a, b) => a.name.localeCompare(b.name));
                setVillagers(data);
                setLoadingVillagers(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <PageContainer>
            <Title>
                <Logo src="/logo192.png" alt="Critterdex Logo" />
                Villagers
            </Title>
            <SubTitle>Find your favorite villagers in ACNH!</SubTitle>
            <VillagerList
                villagers={villagers}
                loadingVillagers={loadingVillagers}
            />
        </PageContainer>
    );
};

export default Villagers;
