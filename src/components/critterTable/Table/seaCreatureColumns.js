import { textFilter } from 'react-bootstrap-table2-filter';
import { imageFormatter, arrayFormatter } from './formatters';

const SeaCreatureColumns = (
    hemisphere,
    setNameTableFilter,
    setTimeTableFilter,
    setMonthTableFilter,
    filterTime
) => [
    {
        dataField: 'no',
        text: 'Critter #',
        sort: true,
        hidden: true,
    },
    {
        dataField: 'image',
        text: 'Image',
        sort: false,
        formatter: imageFormatter,
    },
    {
        dataField: 'name',
        text: 'Name',
        sort: true,
        filter: textFilter({
            getFilter: (filter) => {
                setNameTableFilter(() => filter);
            },
        }),
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
                setTimeTableFilter(() => filter);
            },
        }),
    },
    {
        dataField: 'north_months',
        text: 'Months (Northern Hemisphere)',
        headerStyle: (column, colIndex) => {
            return { width: 0, display: 'none' };
        },
        filter: textFilter({
            getFilter: (filter) => {
                setMonthTableFilter(() => filter);
            },
        }),
        style: { width: 0, display: 'none' },
        hidden: hemisphere === 'north' ? false : true,
    },
    {
        dataField: 'south_months',
        text: 'Months (Southern Hemisphere)',
        headerStyle: (column, colIndex) => {
            return { width: 0, display: 'none' };
        },
        filter: textFilter({
            getFilter: (filter) => {
                setMonthTableFilter(() => filter);
            },
        }),
        style: { width: 0, display: 'none' },
        hidden: hemisphere === 'north' ? true : false,
    },
    {
        dataField: 'north_month_label',
        text: 'Months (Northern Hemisphere)',
        sort: true,
        hidden: hemisphere === 'north' ? false : true,
    },
    {
        dataField: 'south_month_label',
        text: 'Months (Southern Hemisphere)',
        sort: true,
        hidden: hemisphere === 'north' ? true : false,
    },
];

export default SeaCreatureColumns;
