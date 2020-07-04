import React, { useEffect, useState } from 'react';
import Tabs from '../../components/global/Tabs';
import PageContent from '../../components/critterTable/PageContent';
import PageContainer from '../../components/global/PageContainer';
import Title, { Logo } from '../../components/global/Title';
import Subtitle from '../../components/global/Subtitle';
import { event } from '../../util/gtag';
import styled from '@emotion/styled';

const Link = styled.a`
    margin-top: 20px;
    float: left;
    font-size: 10px;
    color: #777;

    @media screen and (max-width: 990px) {
        float: none;
    }
`;

const Page = styled(PageContainer)`
    max-width: 1200px;
`;

const CritterDex = () => {
    const [fish, setFish] = useState([]);
    const [bugs, setBugs] = useState([]);
    const [seaCreatures, setSeaCreatures] = useState([]);
    const [hemisphere, setHemisphere] = useState('north');
    const [critter, setCritter] = useState('fish');

    useEffect(() => {
        fetch('/api/fish')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then((data) => {
                setFish(data);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch('/api/bugs')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then((data) => {
                setBugs(data);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch('/api/sea-creatures')
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong...');
                }
            })
            .then((data) => {
                setSeaCreatures(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleHemisphereChange = (e, hemisphere) => {
        e.preventDefault();
        setHemisphere(hemisphere);
        event({
            action: 'Tab click',
            category: 'Hemisphere',
            label: hemisphere,
        });
    };

    const handleCritterChange = (e, critter) => {
        e.preventDefault();
        setCritter(critter);
        event({
            action: 'Tab click',
            category: 'Critter',
            label: critter,
        });
    };

    const dataMap = {
        bug: bugs,
        fish: fish,
        seaCreature: seaCreatures,
    };

    const activeTab = (tabHemisphere) =>
        tabHemisphere === hemisphere ? 'active' : '';

    return (
        <Page>
            <Title>
                <Logo src="/logo192.png" alt="Critterdex Logo" />
                Critterdex
            </Title>
            <Subtitle>Bug, fish, and sea creatures list from ACNH</Subtitle>
            <Tabs className="nav nav-tabs hemisphere-tabs" role="tablist">
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab('north')}`}
                        href="# "
                        onClick={(e) => handleHemisphereChange(e, 'north')}
                    >
                        Northern Hemisphere
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${activeTab('south')}`}
                        href="# "
                        onClick={(e) => handleHemisphereChange(e, 'south')}
                    >
                        Southern Hemisphere
                    </a>
                </li>
            </Tabs>
            <PageContent
                critter={critter}
                handleCritterChange={handleCritterChange}
                hemisphere={hemisphere}
                data={dataMap[critter]}
            />
            <Link
                className="App-link"
                href="https://meaganpau.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                By: Meagan Pau
            </Link>
        </Page>
    );
};

export default CritterDex;
