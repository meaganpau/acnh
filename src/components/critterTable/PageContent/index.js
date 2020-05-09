import React from 'react';
import styled from '@emotion/styled';
import Tabs from '../../global/Tabs';
import CritterList from '../common/CritterList';
import ContentContainer from '../../global/ContentContainer';

const Title = styled.h3`
    text-transform: capitalize;

    @media screen and (max-width: 990px) {
        margin-bottom: 20px;
    }
`;

const Content = ({ handleCritterChange, hemisphere, critter, data }) => {
    return (
        <ContentContainer tabs={true}>
            <Title>{hemisphere}ern Hemisphere</Title>
            <Tabs>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            critter === 'fish' ? 'active' : ''
                        }`}
                        href="# "
                        onClick={(e) => handleCritterChange(e, 'fish')}
                    >
                        Fish List
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className={`nav-link ${
                            critter === 'bug' ? 'active' : ''
                        }`}
                        href="# "
                        onClick={(e) => handleCritterChange(e, 'bug')}
                    >
                        Bugs List
                    </a>
                </li>
            </Tabs>
            <CritterList
                data={data}
                critter={critter}
                hemisphere={hemisphere}
            />
        </ContentContainer>
    );
};

export default Content;
