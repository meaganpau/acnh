import React from 'react';
import styled from '@emotion/styled';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledTabs = styled.ul`
    max-width: calc(100% - 20px);
    flex-wrap: nowrap;

    .nav-item {
        background: #ececec;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        border: 1px solid #dee2e6;
        border-bottom: none;

        + .nav-item {
            border-left: none;
        }
    }

    .nav-link {
        border: none;
    }
`;

const Tabs = ({ children }) => (
    <StyledTabs className="nav nav-tabs" role="tablist">
        {children}
    </StyledTabs>
);

export default Tabs;
