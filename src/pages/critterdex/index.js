import React, { useEffect, useState } from 'react';
import Tabs from '../../components/global/Tabs';
import PageContent from '../../components/critterTable/PageContent';
import PageContainer from '../../components/global/PageContainer';
import Title, { Logo } from '../../components/global/Title';
import Subtitle from '../../components/global/Subtitle';
import { event } from '../../util/gtag';
import { fetchCached, getCached } from '../../util/apiCache';
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

const critterUrls = {
    fish: '/api/fish',
    bug: '/api/bugs',
    seaCreature: '/api/sea-creatures',
};

// Returns { fish, bug, seaCreature } with fn applied to each URL
const mapTypes = (fn) =>
    Object.fromEntries(
        Object.entries(critterUrls).map(([type, url]) => [type, fn(url)])
    );

const CritterDex = () => {
    // Start with cached data if we have it
    const [data, setData] = useState(() =>
        mapTypes((url) => getCached(url) || [])
    );
    // Each type loads separately
    const [status, setStatus] = useState(() =>
        mapTypes((url) => (getCached(url) ? 'done' : 'loading'))
    );
    const [hemisphere, setHemisphere] = useState('north');
    const [critter, setCritter] = useState('fish');

    useEffect(() => {
        // Ignore results that arrive after leaving the page
        let active = true;

        Object.entries(critterUrls).forEach(([type, url]) => {
            if (getCached(url)) {
                return;
            }
            fetchCached(url)
                .then((json) => {
                    if (!active) return;
                    setData((prev) => ({ ...prev, [type]: json }));
                    setStatus((prev) => ({ ...prev, [type]: 'done' }));
                })
                .catch((err) => {
                    console.log(err);
                    if (!active) return;
                    setStatus((prev) => ({ ...prev, [type]: 'error' }));
                });
        });

        return () => {
            active = false;
        };
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
                data={data[critter]}
                status={status[critter]}
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
