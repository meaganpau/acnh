import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import filterFactory from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import SearchBar from '../../global/SearchBar/';
import useDebounce from '../../../util/debounce';
import months from '../../../util/months';
import monthOptions from '../../../util/monthOptions';
import timeSlots from '../../../util/timeSlots';
import { event } from '../../../util/gtag';
import FishColumns from '../Table/fishColumns';
import BugColumns from '../Table/bugColumns';
import SeaCritterColumns from '../Table/seaCritterColumns';

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
                padding-right: 30px;
                text-align: center;
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
`;

const TableContainer = styled.div`
    overflow: auto;
    position: relative;
    border-bottom-right-radius: 20px;
    margin-top: 50px;

    @media screen and (max-width: 990px) {
        box-shadow: inset -30px 0 25px -20px rgba(0, 0, 0, 0.085);
        border-top-right-radius: 2px;
        margin-top: 30px;
    }
`;

const Title = styled.h3`
    margin-bottom: 30px;
    text-transform: capitalize;
`;

const Filters = styled.div`
    display: flex;
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 20px;

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
`;

const Buttons = styled.div`
    display: flex;
    padding-left: 30px;
    padding-right: 30px;
    justify-content: center;
`;

const AvailableNowButton = styled.button`
    background: ${(props) => props.theme.colors.green};
    background-image: url('/assets/icons/time.svg');
    background-repeat: no-repeat;
    background-size: 20px;
    background-position: 10px center;
    padding-left: 40px;
    border: none;
    color: #fff;

    &:hover {
        color: #fff;
        background-color: ${(props) => props.theme.colors.lightGreen};
    }

    & + button {
        background-color: ${(props) => props.theme.colors.darkBlue};
        margin-left: 10px;
        color: #fff;

        &:hover {
            color: #fff;
            background-color: ${(props) => props.theme.colors.blue};
        }
    }
`;

const filterTime = (filterVal, data) => {
    if (filterVal) {
        const validTimes = timeSlots[filterVal].timeSlots;
        return data.filter((item) => {
            if (item.time.includes('All day')) {
                return true;
            }
            const hasMatchingTimes = item.time.some((time) =>
                validTimes.includes(time)
            );
            return hasMatchingTimes;
        });
    }

    return data;
};

const critterEmojiMap = {
    fish: '🐟',
    bug: '🐛',
    seaCritter: '🐙',
};

const critterTitleMap = {
    fish: 'Fish',
    bug: 'Bug',
    seaCritter: 'Sea Critter',
};

const CritterList = ({ data, critter, hemisphere }) => {
    const [inputVal, setInputVal] = useState('');
    const [month, setMonthFilter] = useState('');
    const [time, setTimeFilter] = useState('');
    const [nameTableFilter, setNameTableFilter] = useState(() => () => {});
    const [monthTableFilter, setMonthTableFilter] = useState(() => () => {});
    const [timeTableFilter, setTimeTableFilter] = useState(() => () => {});

    const handleReset = () => {
        nameTableFilter('');
        monthTableFilter('');
        timeTableFilter('');
        setInputVal('');
        setTimeFilter('');
        setMonthFilter('');
    };

    useEffect(() => {
        handleReset();
    }, [hemisphere]);

    const handleSearch = (val) => {
        nameTableFilter(val);
        setInputVal(val);
    };

    const handleTimeChange = (val) => {
        timeTableFilter(val);
        setTimeFilter(val);
        if (timeSlots[val]) {
            event({
                action: 'Time',
                category: 'Filter',
                label: timeSlots[val] && timeSlots[val].label,
            });
        }
    };

    const handleMonthChange = (val) => {
        monthTableFilter(val);
        setMonthFilter(val);
        event({
            action: 'Month',
            category: 'Filter',
            label: val,
        });
    };

    const debouncedSearchTerm = useDebounce(inputVal, 1000);

    useEffect(() => {
        if (debouncedSearchTerm) {
            event({
                action: 'Search',
                category: 'Filter',
                label: debouncedSearchTerm,
            });
        }
    }, [debouncedSearchTerm]);

    const handleNow = () => {
        const currentTime = new Date();
        const month = months[currentTime.getMonth()];
        const hour = currentTime.getHours();
        handleTimeChange(hour);
        handleMonthChange(month);
        event({
            action: 'Available Now',
            category: 'Button click',
            label: currentTime,
        });
    };

    const handleClearAllFilters = () => {
        handleReset();
        event({
            action: 'Clear all filters',
            category: 'Button click',
        });
    };

    const defaultSorted = [
        {
            dataField: 'no',
            order: 'asc',
        },
    ];

    let columns;
    switch (critter) {
        case 'bug':
            columns = BugColumns(
                hemisphere,
                setNameTableFilter,
                setTimeTableFilter,
                setMonthTableFilter,
                filterTime
            );
            break;
        case 'seaCritter':
            columns = SeaCritterColumns(
                hemisphere,
                setNameTableFilter,
                setTimeTableFilter,
                setMonthTableFilter,
                filterTime
            );
            break;
        default:
            columns = FishColumns(
                hemisphere,
                setNameTableFilter,
                setTimeTableFilter,
                setMonthTableFilter,
                filterTime
            );
            break;
    }

    return (
        <ToolkitProvider
            keyField="no"
            data={data}
            columns={columns}
            bootstrap4
            search={{
                searchFormatted: true,
            }}
        >
            {(props) => (
                <Container>
                    <Title>
                        {critterTitleMap[critter]} List{' '}
                        <span role="img" aria-label="">
                            {critterEmojiMap[critter]}
                        </span>
                    </Title>
                    <Buttons>
                        <AvailableNowButton
                            className="btn btn-md"
                            onClick={handleNow}
                        >
                            Available Now
                        </AvailableNowButton>
                        <button
                            className="btn btn-md"
                            onClick={handleClearAllFilters}
                        >
                            Clear all filters
                        </button>
                    </Buttons>
                    <Filters>
                        <SearchBar
                            onSearch={handleSearch}
                            searchText={inputVal}
                            placeholder="Search by Critter Name"
                        />
                        <select
                            className="form-control"
                            onChange={(e) => handleMonthChange(e.target.value)}
                            value={month}
                        >
                            {monthOptions.map((month, i) => (
                                <option key={i} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                        </select>
                        <select
                            className="form-control"
                            onChange={(e) => handleTimeChange(e.target.value)}
                            value={time}
                        >
                            <option value="">No time filter</option>
                            {Object.entries(timeSlots).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value.label}
                                </option>
                            ))}
                        </select>
                    </Filters>
                    <TableContainer>
                        <BootstrapTable
                            {...props.baseProps}
                            defaultSorted={defaultSorted}
                            filter={filterFactory()}
                            noDataIndication="No critters found :("
                        />
                    </TableContainer>
                </Container>
            )}
        </ToolkitProvider>
    );
};

export default CritterList;
