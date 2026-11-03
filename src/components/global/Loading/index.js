import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 40px 20px;
    color: #777;
    font-weight: 500;
`;

const Spinner = styled.span`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 4px solid #e5e5e5;
    border-top-color: #999;
    animation: ${spin} 0.8s linear infinite;

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 2.4s;
    }
`;

const Loading = ({ children = 'Loading...' }) => (
    <Wrapper role="status" aria-live="polite">
        <Spinner aria-hidden="true" />
        {children}
    </Wrapper>
);

export default Loading;
