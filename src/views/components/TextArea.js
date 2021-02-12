
import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    margin: PropTypes.number,
    children: PropTypes.node
}

const defaultProps = {
    value: '',
    width: 'auto',
    margin: 0,
    children: null
}

const TextAreaContainer = styled('textarea')(({ theme, width, margin }) => ({
    resize: 'none',
    overflow: 'auto',
    width,
    margin,
    padding: 5
}));

const TextArea = ({ width, margin, value, ref, ...others }) => {
    
    const [inputValue, setInputValue] = useState(value);

    const inputOnChange = e => {
        setInputValue(e.target.value);
    }

    return (
        <TextAreaContainer margin={margin} width={width} value={inputValue} onChange={inputOnChange} ref={ref} {...others} />
    )
}


TextArea.propTypes = propTypes;
TextArea.defaultProps = defaultProps;


export default TextArea;
