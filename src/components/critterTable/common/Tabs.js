import React from 'react'
import styled from '@emotion/styled'
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledTabs = styled.ul`
  max-width: calc(100% - 20px);
  flex-wrap: nowrap;

  .nav-item {
    background: #ececec;
  }
`

const Tabs = ({ children }) => <StyledTabs className="nav nav-tabs" role="tablist">{children}</StyledTabs>

export default Tabs