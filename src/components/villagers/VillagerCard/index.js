import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Heart from 'react-animated-heart';

const Card = styled.div`
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 30px;
    flex-basis: 300px;
    margin: 10px auto;
    background: #fff;

    /* Image on the left, name and details on the right */
    @media screen and (max-width: 581px) {
        position: relative;
        display: grid;
        grid-template-columns: 80px 1fr;
        column-gap: 15px;
        align-items: center;
        flex-basis: 100%;
        margin: 5px 0;
        padding: 15px;
    }
`;

const Img = styled.img`
    max-height: 120px;

    @media screen and (max-width: 581px) {
        grid-row: 1 / span 2;
        justify-self: center;
        max-width: 80px;
        max-height: 80px;
    }
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

    @media screen and (max-width: 581px) {
        grid-column: 2;
        font-size: 14px;

        p {
            margin-bottom: 2px;
        }

        span {
            font-size: 13px;
        }
    }
`;

const Profile = styled.div`
    text-align: center;

    /* Puts the image and name directly in the card's grid */
    @media screen and (max-width: 581px) {
        display: contents;
    }
`;

const Name = styled.h4`
    margin-top: 15px;
    margin-bottom: 10px;

    @media screen and (max-width: 581px) {
        grid-column: 2;
        align-self: end;
        margin: 0 0 5px;
        padding-right: 40px;
        font-size: 20px;
        text-align: left;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: -40px;
    margin-right: -40px;

    /* Lines the red heart up with the grey one (the library is a few px off) */
    ${(props) =>
        props.isFav &&
        `
        & > div {
            background-position: -2800px 0;
        }
    `}

    @media screen and (max-width: 581px) {
        position: absolute;
        top: -25px;
        right: -5px;
        margin: 0;
    }
`;

const VillagerCard = ({
    villager,
    handleAddVillager,
    handleRemoveVillager,
    favouriteVillagers,
}) => {
    const [isFav, setFav] = useState(false);

    useEffect(() => {
        if (favouriteVillagers.includes(villager.name)) {
            setFav(true);
        } else {
            setFav(false);
        }
    }, [favouriteVillagers, villager.name]);

    const handleBtnClick = (e, name, type) => {
        if (!isFav) {
            handleAddVillager(name);
        } else {
            handleRemoveVillager(name);
        }

        setFav(!!isFav);
    };

    return (
        <Card>
            <Profile>
                <ButtonContainer isFav={isFav}>
                    <Heart
                        isClick={isFav}
                        onClick={(e) =>
                            handleBtnClick(e, villager.name, 'favourite')
                        }
                    />
                </ButtonContainer>
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
                    <span>Birth date:</span> {villager.birthdate}
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
