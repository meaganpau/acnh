import React from 'react'
import CritterImage from '../common/CritterImage'

export const imageFormatter = (cell, row) => <CritterImage src={cell} alt={row.name}/>

export const arrayFormatter = (cell, row) => cell.join(', ')


// Shorter header text on mobile. Keeps the sort caret and filter.
export const shortHeader = (shortText) => (column, colIndex, { sortElement, filterElement }) => (
    <>
        <span className="header-full">{column.text}</span>
        <span className="header-short">{shortText}</span>
        {sortElement}
        {filterElement}
    </>
)
