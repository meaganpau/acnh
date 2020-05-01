import React from 'react';
import styled from '@emotion/styled';

const Card = styled.div`
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 30px;
    flex-basis: 300px;
    margin: 10px auto;
    background: #fff;
`;

const Img = styled.img`
    max-height: 120px;
`;

const Details = styled.div`
    text-align: left;

    p {
        margin-bottom: 5px;
    }

    span {
        font-weight: 500;
        font-size: 14px;
        margin-right: 5px;
    }
`;

const Profile = styled.div`
    text-align: center;
`;

const Name = styled.h4`
    margin-top: 15px;
    margin-bottom: 10px;
`;

const handleProfileClick = (name) => {
    // console.log(name);
};

const VillagerCard = ({ villager }) => {
    return (
        <Card>
            <Profile onClick={() => handleProfileClick(villager.name)}>
                <Img
                    src={`/assets/villagers/${villager.filename}`}
                    alt={villager.name}
                />
                <Name>{villager.name}</Name>
            </Profile>
            <Details>
                <p>
                    <span>Sex:</span> {villager.sex}
                </p>
                <p>
                    <span>Species:</span> {villager.species}
                </p>
                <p>
                    <span>Birthdate:</span> {villager.birthdate}
                </p>
                <p>
                    <span>Catchphrase:</span> <i>"{villager.catchphrase}"</i>
                </p>
                <p>
                    <span>Personality:</span> {villager.personality}
                </p>
            </Details>
        </Card>
    );
};

export default VillagerCard;
