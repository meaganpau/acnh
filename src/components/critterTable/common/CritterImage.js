import React from 'react'
import styled from '@emotion/styled'

const Image = styled.img`
    max-width: 50px;
    max-height: 50px;
`

const CritterImage = ({ src, alt }) => <Image src={src} alt={alt}/>

export default CritterImage