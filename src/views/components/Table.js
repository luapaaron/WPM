
import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const propTypes = {
    children: PropTypes.node,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

const defaultProps = {
    children: null,
    width: '100%'
}

const Table = styled('table')(({ theme, width, col = 4 }) => ({
    display: 'block',
    width: '100%',
    height: 'auto',
    margin: 0,
    padding: 0,
    boxShadow: 'none',
    borderRadius: 5,
    borderCollapse: 'separate',
    borderSpacing: 0,
    verticalAlign: 'inherit',
    textAlign: 'left',
    fontWeight: 'inherit',

    'td,th': {
        padding: '10px 20px',
        boxSizing: 'border-box',
        display: 'inline-block',
        width: `calc(100%/${col})`
    }
}));

const TRow = styled('tr')({
    display: 'block',
    width: '100%'
});

const THead = styled('thead')(({ theme }) => ({
    boxShadow: 'none',
    display: 'block',
    fontSize: '11.5px',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#d0d0d0',
    borderTopColor: '#d0d0d0',
    borderBottomStyle: 'solid',
    borderTopStyle: 'solid',
    color: '#d0d0d0'
}));

const TBody = styled('tbody')(({ theme, isStripped }) => ({
    boxShadow: 'none',
    display: 'block',

    '>tr:nth-of-type(even)': {
        backgroundColor: isStripped ? theme.tableTDBgColorEven : theme.tableTDBgColorOdd
    },
    '>tr:nth-of-type(odd)': {
        backgroundColor: theme.tableTDBgColorOdd
    }
}));

const TH = styled('th')({});
const TD = styled('td')(({ theme, bold, width, color }) => ({
    fontWeight: bold ? 700 : 400,
    width: width ? `${width} !important` : 'auto',
    color: color ? `${theme[color]} !important` : 'inherit',
    wordBreak: 'break-word'
}));


Table.TR = TRow;
Table.THead = THead;
Table.TBody = TBody;
Table.TH = TH;
Table.TD = TD;

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default Table;