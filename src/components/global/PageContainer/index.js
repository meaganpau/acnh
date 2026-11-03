import styled from '@emotion/styled';

const PageContainer = styled.div`
    margin: 0 auto;
    text-align: center;
    padding: 50px;

    @media screen and (max-width: 990px) {
        padding: 20px;
    }

    @media screen and (max-width: 581px) {
        padding: 10px 6px;
    }
`;

export default PageContainer;
