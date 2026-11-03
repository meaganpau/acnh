import React from 'react'
import CritterImage from '../common/CritterImage'

export const imageFormatter = (cell, row) => <CritterImage src={cell} alt={row.name}/>

export const arrayFormatter = (cell, row) => cell.join(', ')


// Swaps the header text for a shorter label on mobile. A headerFormatter
// replaces the whole cell, so the sort caret and filter have to be rendered
// here too.
export const shortHeader = (shortText) => (column, colIndex, { sortElement, filterElement }) => (
    <>
        <span className="header-full">{column.text}</span>
        <span className="header-short">{shortText}</span>
        {sortElement}
        {filterElement}
    </>
)
