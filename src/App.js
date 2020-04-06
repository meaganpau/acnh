import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import theme from './styles/theme'
import Content from './components/Content'
import Tabs from './components/common/Tabs'

const Title = styled.h1`
  font-family: ${props => props.theme.fonts.title};
`

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 50px;

  @media screen and (max-width: 990px) {
    padding: 20px;
  }
`

const Link = styled.a`
  margin-top: 20px;
  float: left;
  font-size: 10px;
  color: #777;

  @media screen and (max-width: 990px) {
    float: none;
  }
`

const SubTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
`

const App = () => {
  const [fish, setFish] = useState([])
  const [bugs, setBugs] = useState([])
  const [hemisphere, setHemisphere] = useState('north')
  const [critter, setCritter] = useState('fish')
  
  useEffect(() => {
    fetch('/api/fish')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong...')
        }
      })
      .then(data => {
        setFish(data)
      })
      .catch(err => {
        console.log(err);
      })

    fetch('/api/bugs')
      .then(res => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Something went wrong...')
        }
      })
      .then(data => {
        setBugs(data)
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  const handleHemisphereChange = (e, hemisphere) => {
    e.preventDefault();
    setHemisphere(hemisphere)
  }
  
  const handleCritterChange = (e, critter) => {
    e.preventDefault()
    setCritter(critter)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>Critterdex</Title>
        <SubTitle>Critters from Animal Crossing: New Horizons</SubTitle>
        <Tabs className="nav nav-tabs hemisphere-tabs" role="tablist">
          <li className="nav-item">
            <a className={`nav-link ${hemisphere === 'north' ? 'active' : ''}`} href="# " onClick={(e) => handleHemisphereChange(e, 'north')}>Northern Hemisphere</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${hemisphere === 'south' ? 'active' : ''}`} href="# " onClick={(e) => handleHemisphereChange(e, 'south')}>Southern Hemisphere</a>
          </li>
        </Tabs>
        <Content 
          critter={critter} 
          handleCritterChange={handleCritterChange} 
          hemisphere={hemisphere}
          fish={fish}
          bugs={bugs}
        />
        <Link
          className="App-link"
          href="https://meaganpau.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          By: Meagan Pau
        </Link>
      </Container>
    </ThemeProvider>
  );
}

export default App;
