import React from 'react'
import styled from '@emotion/styled'
import Tabs from '../common/Tabs'
import CritterList from '../common/CritterList'

const Container = styled.div`
    padding: 20px;
    background: white;
    border-radius: 20px;
    border-top-left-radius: 0;
    padding-top: 30px;
    border: 1px solid #dee2e6;
    border-top: none;
`

const Title = styled.h3`
    text-transform: capitalize;

    @media screen and (max-width: 990px) {
        margin-bottom: 20px;
    }
`

const Content = ({ handleCritterChange, hemisphere, critter, data }) => {
    return (
        <Container>
            <Title>{hemisphere}ern Hemisphere</Title>
            <Tabs>
                <li className="nav-item">
                    <a className={`nav-link ${critter === 'fish' ? 'active' : ''}`} href="# " onClick={(e) => handleCritterChange(e, 'fish')}>Fish List</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${critter === 'bug' ? 'active' : ''}`} href="# " onClick={(e) => handleCritterChange(e, 'bug')}>Bugs List</a>
                </li>
            </Tabs>
            <CritterList data={data} critter={critter} hemisphere={hemisphere} />
        </Container>
    )
}

export default Content