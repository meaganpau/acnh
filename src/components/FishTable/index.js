import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import SearchBar from './SearchBar'
import months from '../../util/months'
import timeSlots from '../../util/timeSlots'
import monthOptions from '../../util/monthOptions'
import { event } from '../../util/gtag'
import useDebounce from '../../util/debounce'

const Container = styled.div`
    background: #fff;
    border-radius: 20px;
    border-top-left-radius: 0;
    padding-top: 30px;
    border: 1px solid #dee2e6;
    border-top: none;

    table {
        table-layout: auto;
        border: none;
        text-align: left;
        margin-bottom: 0;

        .caret-4-desc,
        .caret-4-asc,
        .order-4 {
            position: absolute;
        }

        th {
            padding-right: 50px;

            label {
                display: none;
            }
        }

        tr {
            td:first-of-type,
            th:first-of-type {
                border-left: 0;
                padding-left: 30px;
            }

            td:last-of-type,
            th:last-of-type {
                border-right: 0;
            }

            &:last-of-type td {
                border-bottom: 0;
            }

            &:first-of-type td {
                border-top: 0;
            }
            
            &:first-of-type th {
                border-top: 0;
            }
        }
    }
`

const TableContainer = styled.div`
    overflow: auto;
    position: relative;
    border-bottom-right-radius: 20px;
    margin-top: 30px;

    @media screen and (max-width: 990px) {
        box-shadow: inset -12px 0 10px -5px rgba(0,0,0,.085);
        border-top-right-radius: 2px;
    }
`

const Filters = styled.div`
    display: flex;
    padding-left: 30px;
    padding-right: 30px;

    select {
        max-width: 300px;
        margin-left: 10px;
    }

    input {
        width: 100%;
    }

    @media screen and (max-width: 990px) {
        flex-direction: column;

        select {
            margin-top: 10px;
            max-width: none;
            margin-left: 0;
        }
    }
`

const Buttons = styled.div`
    display: flex;
    margin-top: 30px;
    padding-left: 30px;
    padding-right: 30px;

    button {
        background: ${props => props.theme.colors.green};
        border: none;
        color: #fff;

        &:hover {
            color: #fff;
            background: ${props => props.theme.colors.lightGreen};
        }

        & + button {
            background: ${props => props.theme.colors.darkBlue};
            margin-left: 10px;

            &:hover {
                background: ${props => props.theme.colors.blue};
            }
        }
    }
`

const Title = styled.h3`
    margin-bottom: 30px;
`

const arrayFormatter = (cell, row) => {
    return cell.join(', ')
}

let nameFilter
let monthFilter
let timeFilter

const filterTime = (filterVal, data) => {
    if (filterVal) {
        const validTimes = timeSlots[filterVal].timeSlots;
        return data.filter((fish) => {
            if (fish.time.includes('All day')) { return true; }
            const hasMatchingTimes = fish.time.some(time => validTimes.includes(time))
            return hasMatchingTimes;
        })
    }
    
    return data;
}

const FishTable = ({ fish, hemisphere }) => {
    const [inputVal, setInputVal] = useState('')
    const [month, setMonthFilter] = useState('')
    const [time, setTimeFilter] = useState('')

    useEffect(() => {
        handleReset()
    }, [hemisphere])

    const debouncedSearchTerm = useDebounce(inputVal, 1000)

    useEffect(() => {
        if (debouncedSearchTerm) {
            event({
                action: 'Search',
                category: 'Filter',
                label: debouncedSearchTerm
            })
        }
    },[debouncedSearchTerm]);

    const handleReset = () => {
        nameFilter('')
        monthFilter('')
        timeFilter('')
        setInputVal('')
        setTimeFilter('')
        setMonthFilter('')
    };

    const handleSearch = val => {
        nameFilter(val)
        setInputVal(val)
    }

    const handleTimeChange = val => {
        timeFilter(val)
        setTimeFilter(val)
        event({
            action: 'Time',
            category: 'Filter',
            label: timeSlots[val].label
        })
    }

    const handleMonthChange = val => {
        monthFilter(val)
        setMonthFilter(val)
        event({
            action: 'Month',
            category: 'Filter',
            label: val
        })
    }

    const handleNow = () => {
        const currentTime = new Date();
        const month = months[currentTime.getMonth()];
        const hour = currentTime.getHours()
        handleSearch('')
        handleTimeChange(hour)
        handleMonthChange(month)
        event({
            action: 'Available Now',
            category: 'Button click',
            label: currentTime,
        })
    }

    const handleClearAllFilters = () => {
        handleReset()
        event({
            action: 'Clear all filters',
            category: 'Button click',
        })
    }
 
    const columns = [{
        dataField: 'no',
        text: 'Critter #',
        sort: true,
        hidden: true
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true,
        filter: textFilter({
            getFilter: (filter) => {
                nameFilter = filter;
            }
        })
    },
    {
        dataField: 'location',
        text: 'Location',
        sort: true
    },
    {
        dataField: 'specific_location',
        text: 'Specific Location',
        hidden: true
    },
    {
        dataField: 'weather',
        text: 'Weather',
        hidden: true
    },
    {
        dataField: 'shadow',
        text: 'Shadow Size',
        sort: true
    },
    {
        dataField: 'fin',
        text: 'Fin Showing',
        hidden: true
    },
    {
        dataField: 'value',
        text: 'Sell Value',
        sort: true,
    },
    {
        dataField: 'time',
        text: 'Time',
        sort: true,
        formatter: arrayFormatter,
        filter: textFilter({
            onFilter: filterTime,
            getFilter: (filter) => {
                timeFilter = filter;
            }
        }),
    },
    {
        dataField: 'north_months',
        text: 'Months (Northern Hemisphere)',
        headerStyle: (column, colIndex) => {
            return { width: 0 , 'display': 'none'}
        },
        filter: textFilter({
            getFilter: (filter) => {
                monthFilter = filter;
            }
        }),
        style: {width: 0, 'display': 'none'},
        hidden: hemisphere === 'north' ? false : true
    },
    {
        dataField: 'south_months',
        text: 'Months (Southern Hemisphere)',
        headerStyle: (column, colIndex) => {
            return { width: 0 , 'display': 'none'}
        },
        filter: textFilter({
            getFilter: (filter) => {
                monthFilter = filter;
            }
        }),
        style: {width: 0, 'display': 'none'},
        hidden: hemisphere === 'north' ? true : false
    },
    {
        dataField: 'north_month_label',
        text: 'Months (Northern Hemisphere)',
        sort: true,
        hidden: hemisphere === 'north' ? false : true
    },
    {
        dataField: 'south_month_label',
        text: 'Months (Southern Hemisphere)',
        sort: true,
        hidden: hemisphere === 'north' ? true : false
    }];

    const defaultSorted = [{
        dataField: 'no',
        order: 'asc'
    }];
    
    return (
        <ToolkitProvider
            keyField="no"
            data={ fish }
            columns={ columns }
            bootstrap4
            search={ {
                searchFormatted: true
            } }
        >
            { props => (
                <Container>
                    <Title>{hemisphere === 'north' ? 'Northern' : 'Southern'} Hemisphere</Title>
                    <Filters>
                        <SearchBar 
                            onSearch={handleSearch}
                            searchText={inputVal}
                        />
                        <select className="form-control" 
                            onChange={ (e) => handleMonthChange(e.target.value) } 
                            value={month}
                        >
                            {monthOptions.map((month, i) => 
                                <option key={i} value={month.value}>{month.label}</option>
                            )}
                        </select>
                        <select 
                            className="form-control" 
                            onChange={ (e) => handleTimeChange(e.target.value) } 
                            value={time}
                        >
                            <option value="">No time filter</option>
                            {Object.entries(timeSlots).map(([key, value]) => 
                                <option key={key} value={key}>{value.label}</option>
                            )}
                        </select>
                    </Filters>
                    <Buttons>
                        <button className="btn btn-md" onClick={ handleNow }>Available Now</button>
                        <button className="btn btn-md" onClick={ handleClearAllFilters }>Clear all filters</button>
                    </Buttons>
                    <TableContainer>
                        <BootstrapTable 
                            { ...props.baseProps }
                            defaultSorted={ defaultSorted }
                            filter={ filterFactory() }
                            noDataIndication="No fish found :("
                        />   
                    </TableContainer>
                </Container>
            )}
        </ToolkitProvider>
    )
}

export default FishTable