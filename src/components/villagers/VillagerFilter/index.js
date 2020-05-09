import React, { useEffect } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 0 auto 20px;
    padding-left: 50px;
    padding-right: 50px;

    @media screen and (max-width: 581px) {
        padding-left: 0;
        padding-right: 0;
    }
`;

const Label = styled.label`
    margin-top: 20px;
    width: 30%;
    min-width: 200px;
    margin-left: auto;
    margin-right: auto;

    p {
        margin: 0;
        margin-right: 10px;
        font-weight: 500;
    }

    @media screen and (max-width: 581px) {
        max-width: 400px;
        width: 100%;
    }
`;

const VillagerFilter = ({ handleFilter, currentFilter }) => {
    useEffect(() => {
        handleFilter(currentFilter);
    }, [currentFilter]);

    const handleFilterChange = (e) => {
        const newFilterObj = {
            ...currentFilter,
        };

        newFilterObj[e.target.id] = e.target.value;
        handleFilter(newFilterObj);
    };

    return (
        <Container>
            <Label htmlFor="personality">
                <p>Personality: </p>
                <select
                    id="personality"
                    onChange={handleFilterChange}
                    value={currentFilter.personality}
                    className="form-control"
                >
                    <option value="">No personality filter</option>
                    <option>Normal</option>
                    <option>Peppy</option>
                    <option>Sisterly</option>
                    <option>Snooty</option>
                    <option>Jock</option>
                    <option>Lazy</option>
                    <option>Cranky</option>
                    <option>Smug</option>
                </select>
            </Label>
            <Label htmlFor="species">
                <p>Species: </p>
                <select
                    id="species"
                    onChange={handleFilterChange}
                    value={currentFilter.species}
                    className="form-control"
                >
                    <option value="">No species filter</option>
                    <option>Alligator</option>
                    <option>Anteater</option>
                    <option>Bear</option>
                    <option>Bird</option>
                    <option>Bull</option>
                    <option>Cat</option>
                    <option>Chicken</option>
                    <option>Cow</option>
                    <option>Cub</option>
                    <option>Deer</option>
                    <option>Dog</option>
                    <option>Duck</option>
                    <option>Eagle</option>
                    <option>Elephant</option>
                    <option>Frog</option>
                    <option>Goat</option>
                    <option>Gorilla</option>
                    <option>Hamster</option>
                    <option>Hippo</option>
                    <option>Horse</option>
                    <option>Kangaroo</option>
                    <option>Koala</option>
                    <option>Lion</option>
                    <option>Monkey</option>
                    <option>Mouse</option>
                    <option>Ostrich</option>
                    <option>Penguin</option>
                    <option>Pig</option>
                    <option>Rabbit</option>
                    <option>Sheep</option>
                    <option>Squirrel</option>
                    <option>Tiger</option>
                    <option>Wolf</option>
                </select>
            </Label>
            <Label htmlFor="sex">
                <p>Sex: </p>
                <select
                    id="sex"
                    onChange={handleFilterChange}
                    value={currentFilter.sex}
                    className="form-control"
                >
                    <option value="">No sex filter</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </Label>
        </Container>
    );
};

export default VillagerFilter;
