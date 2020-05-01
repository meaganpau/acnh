import React from 'react';
import styled from '@emotion/styled';

const StyledContentContainer = styled.div`
    padding: 20px;
    background: white;
    border-radius: 20px;
    border-top-left-radius: ${(props) => (props.tabs ? 0 : 20)};
    padding-top: 30px;
    border: 1px solid #dee2e6;
    border-top: none;
`;

const ContentContainer = ({ tabs, children }) => {
    return (
        <StyledContentContainer tabs={tabs}>{children}</StyledContentContainer>
    );
};

export default ContentContainer;
