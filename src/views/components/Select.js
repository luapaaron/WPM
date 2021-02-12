import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import isEmpty from '../../utils/isEmpty';

import Text from './Text';


const propTypes = {
    placeholder: PropTypes.string,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ]),
            text: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number
            ])
        }),
    ),
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    optionsContainerMaxHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    onChange: PropTypes.func,
    fontSize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const defaultProps = {
    placeholder: '',
    width: '100%',
    height: 75,
    value: '',
    optionsContainerMaxHeight: 200,
    options: [],
    onChange: () => {},
    fontSize: 20
}

const InputFieldDisplay = styled('div')(({
    theme, width, fontSize, height
}) => ({
    fontSize,
    lineHeight: '1.75rem',
    letterSpacing: '.009375em',
    width,
    height: '100%',
    padding: '26px 16px 16px',
    transition: 'opacity .15s cubic-bezier(.4,0,.2,1)',
    border: 'none',
    borderRadius: '0',
    background: 'none',
    appearance: 'none',
    boxSizing: 'border-box',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flexGrow: 0,
    flexShrink: 0,
    paddingTop: (height <= 50) ? 15 : 26,

    '&:focus': {
        outline: 'none'
    },
}));

const InputContainer = styled('div')(({ theme, inputFocus, inverted, height }) => ({
    backgroundColor: inverted ?
        (inputFocus ? `${theme.inputActiveBackgroundColorInverted} !important` : theme.inputBackgroundColorInverted) :
        (inputFocus ? `${theme.inputActiveBackgroundColor} !important` : theme.inputBackgroundColor),
    position: 'relative',
    borderRadius: '4px 4px 0 0',
    width: '100%',
    height,

    '&:hover': {
        backgroundColor: inverted ? theme.inputHoverBackgroundColorInverted : theme.inputHoverBackgroundColor,
    }
}));

const InputLabel = styled('label')(({ theme, inputFocus, inputHasValue, fontSize }) => ({
    color: inputFocus ? theme.primaryColor : theme.inputPlaceholderColor,
    fill: inputFocus ? theme.primaryColor : theme.inputPlaceholderColor,
    fontSize,
    lineHeight: '1.75rem',
    letterSpacing: '.009375em',
    left: 16,
    right: 'auto',
    top: (inputFocus || inputHasValue) ? 18 : '50%',
    position: 'absolute',
    pointerEvents: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    cursor: 'text',
    overflow: 'hidden',
    willChange: 'transform',
    transition: 'transform .15s cubic-bezier(.4, 0, .2, 1), color .15s cubic-bezier(.4, 0, .2, 1)',
    transform: (inputFocus || inputHasValue) ? 'translateY(-50%) scale(0.75)' : 'translateY(-50%)',
    transformOrigin: 'left top'
}));

const InputBorder = styled('div')(({ theme, width, inputFocus }) => ({
    width,
    height: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: theme.primaryColor,
    transition: 'transform .18s cubic-bezier(.4, 0, .2, 1), opacity .18s cubic-bezier(.4, 0, .2, 1)',
    transform: inputFocus ? 'scaleX(1)' : 'scaleX(0)',
    opacity: inputFocus ? 1 : 0
}));

const SelectWrapper = styled('div')(({ theme, width }) => ({
    width,
    position: 'relative',
    cursor: 'pointer',

    '*':{
        cursor: 'pointer !important'
    },
    
    '&.error': {
        marginBottom: '30px !important',
        '>div': {
            '>div:first-child': {
                borderBottomColor: theme.inputBorderError
            },
            '>label': {
                color: theme.inputPlaceholderErrorColor
            },
            '>span': {
                display: 'block'
            }
        }
    }
}));

const DisplayRow = styled('div')(({ theme, inputFocus }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.inputBorderBgColor}`,
    height: '100%',

    '&:hover': {
        borderBottomColor: theme.inputBorderHoverBgColor
    },

    'svg':{
        transform: inputFocus ? 'rotate(-90deg)' : 'rotate(90deg)',
    }
}));

const InputErrorMessage = styled(Text)(({ theme }) => ({
    position: 'relative',
    top: 5,
    left: 16,
    display: 'none',
    color: `${theme.inputPlaceholderErrorColor} !important`
}));


const OptionsContainer = styled('div')(({ theme, ContainerHeight, inputFocus, maxHeight }) => ({
    display: inputFocus ? 'flex' : 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: ContainerHeight,
    minHeight: 40,
    width: '100%',
    backgroundColor: theme.white,
    zIndex: 1,
    overflowY: 'auto',
    maxHeight,
    border: `1px solid ${theme.primaryColor}`
}));

const Option = styled('div')(({ theme, selected }) => ({
    width: '100%',
    minHeight: 40,
    height: 40,
    padding: '10px 20px',
    display: 'flex',
    alignItems: 'center',
    cursor: selected ? 'default !important' : 'pointer',
    backgroundColor: selected ? theme.selectOptionHoverBgColor : theme.white,

    ':hover':{
        backgroundColor: theme.selectOptionHoverBgColor
    }
}));

const Select = ({ width, height, placeholder, value, valueText, options, optionsContainerMaxHeight, onChange, fontSize, ...others }) => {

    const [inputFocus, setInputFocus] = useState(false);
    const [inputValue, setInputValue] = useState(value);
    const [inputText, setInputText] = useState(valueText);
    const [inputHasValue, setinputHasValue] = useState((value !== '') ? true : false);

    const inputOnChange = e => {
        if (e.target.value && (e.target.value).trim() !== '') {
            setinputHasValue(true);
        } else {
            setinputHasValue(false);
        }
    }

    const optionOnClick = (value, text, onChange) => () => {
        setInputValue(value);
        setInputText(text);

        if (onChange){
            onChange(value);
        }
    }

    const onClick = () => {
        setInputFocus(false);
    }

    useEffect(() => {
        if (inputFocus){
            window.addEventListener('click', onClick);
        } else {
            window.removeEventListener('click', onClick);
        }

        return () => {
            window.removeEventListener('click', onClick);
        }
    }, [inputFocus]);

    //if (isEmpty(options)) return null;
    return (
        <SelectWrapper width={width}>
            <InputContainer height={height} inverted inputFocus={!isEmpty(inputValue) || inputFocus} onClick={() => setInputFocus(true) }>
                <input type="hidden" onChange={inputOnChange} value={inputValue} {...others} />
                <DisplayRow inputFocus={inputFocus}>
                    <InputFieldDisplay height={height} fontSize={fontSize}>{inputText}</InputFieldDisplay>
                </DisplayRow>
                
                <InputLabel inputHasValue={inputHasValue} inputFocus={!isEmpty(inputValue) || inputFocus} fontSize={fontSize} >{placeholder} </InputLabel>
                <InputBorder inputFocus={inputFocus} width={width} />
                <InputErrorMessage>This field is required.</InputErrorMessage>
            </InputContainer>
            <OptionsContainer ContainerHeight={height} maxHeight={optionsContainerMaxHeight} inputFocus={inputFocus}>
                {
                    options.map(option => (
                        <Option key={option.value} selected={option.value === inputValue} onClick={optionOnClick(option.value, option.text, onChange)}><Text>{option.text}</Text></Option>
                    ))
                }
            </OptionsContainer>
        </SelectWrapper>
    );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;