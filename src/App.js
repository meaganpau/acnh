import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import theme from './styles/theme'
import FishTable from './components/FishTable'
import 'bootstrap/dist/css/bootstrap.min.css';

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

const Tabs = styled.ul`
  max-width: calc(100% - 20px);
  flex-wrap: nowrap;

  .nav-item {
    background: #ececec;
  }
`

const Link = styled.a`
  margin-top: 20px;
  float: left;
  font-size: 10px;
  color: #777;
`

const App = () => {
  const [fish, setFish] = useState([])
  const [hemisphere, setHemisphere] = useState('north')
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
  }, [])

  const handleHemisphereChange = (e, hemisphere) => {
    e.preventDefault();
    document.querySelectorAll('.nav-link.active').forEach(item => {
      item.classList.remove('active')
    });
    e.target.classList.add('active');
    setHemisphere(hemisphere)
  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>ACNH Critter List</Title>
        <h2>Fish List</h2>
        <Tabs className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" href="# " onClick={(e) => handleHemisphereChange(e, 'north')}>Northern Hemisphere</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="# " onClick={(e) => handleHemisphereChange(e, 'south')}>Southern Hemisphere</a>
          </li>
        </Tabs>
        {
          hemisphere === 'north' ?
          <FishTable fish={fish} hemisphere='north'/>
          :<FishTable fish={fish} hemisphere='south'/>
        }
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
