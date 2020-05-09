import React from 'react';
import { Link } from '@reach/router';
import styled from '@emotion/styled';

const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    margin-right: 10px;
`;

const StyledLink = styled(Link)`
    padding: 6px 18px;

    &:hover {
        text-decoration: none;
    }
`;

const LeftStyledLink = styled(StyledLink)`
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    border: 1px solid lightgrey;
    border-right: none;
`;

const RightStyledLink = styled(StyledLink)`
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    border: 1px solid lightgrey;
`;

const isActive = ({ isCurrent }) => {
    return {
        style: {
            background: isCurrent ? 'white' : '#ececec',
            color: isCurrent ? '#111' : '#888',
        },
    };
};

const Navigation = () => {
    return (
        <Nav>
            <LeftStyledLink to="/" getProps={isActive}>
                Critterdex
            </LeftStyledLink>
            <RightStyledLink getProps={isActive} to="villagers" onClick>
                Villagers
            </RightStyledLink>
        </Nav>
    );
};

export default Navigation;
