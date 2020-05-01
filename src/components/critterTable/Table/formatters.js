import React from 'react'
import CritterImage from '../common/CritterImage'

export const imageFormatter = (cell, row) => <CritterImage src={cell} alt={row.name}/>

export const arrayFormatter = (cell, row) => cell.join(', ')
