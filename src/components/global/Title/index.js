import styled from '@emotion/styled';

const Title = styled.h1`
    font-family: ${(props) => props.theme.fonts.title};
    font-size: 56px;

    @media screen and (max-width: 990px) {
        font-size: 36px;
    }
`;

export const Logo = styled.img`
    max-width: 45px;
    margin-right: 15px;
    margin-left: -60px;
    position: relative;
    top: -2px;

    @media screen and (max-width: 990px) {
        max-width: 30px;
        margin-right: 10px;
        margin-left: -40px;
    }
`;

export default Title;
