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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: -40px;
    margin-right: -40px;
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
    }, [favouriteVillagers]);

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
                <ButtonContainer>
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
