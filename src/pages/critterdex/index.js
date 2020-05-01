import React, { useEffect, useState } from 'react';
import Tabs from '../../components/critterTable/common/Tabs';
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

    const data = critter === 'bug' ? bugs : fish;

    return (
        <Page>
            <Title>
                <Logo src="/logo192.png" alt="Critterdex Logo" />
                Critterdex
            </Title>
            <Subtitle>Bug and fish list from ACNH</Subtitle>
            <Tabs className="nav nav-tabs hemisphere-tabs" role="tablist">
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            hemisphere === 'north' ? 'active' : ''
                        }`}
                        href="# "
                        onClick={(e) => handleHemisphereChange(e, 'north')}
                    >
                        Northern Hemisphere
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            hemisphere === 'south' ? 'active' : ''
                        }`}
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
                data={data}
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
