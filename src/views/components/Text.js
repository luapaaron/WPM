import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const propTypes = {
    clickable: PropTypes.bool,
    bold: PropTypes.bool,
    fontSize: PropTypes.number,
    lineHeight: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    noWrap: PropTypes.bool,
    primaryColor: PropTypes.bool,
    inverted: PropTypes.bool
}

const defaultProps = {
    clickable: false,
    bold: false,
    fontSize: 14,
    lineHeight: 'normal',
    noWrap: false,
    primaryColor: false,
    inverted: false
}

const Text = styled('span')(({
    theme, clickable, bold, fontSize, lineHeight, noWrap, inverted, primaryColor
}) => ({
    color: inverted ? 
        (clickable ? theme.clickableTextColorInverted : theme.textColorInverted) :
        (clickable ? theme.clickableTextColor : (primaryColor ? theme.primaryColor : theme.textColor)),
    fontWeight: bold ? 'bold' : 'normal',
    fontSize,
    lineHeight: lineHeight ? lineHeight : '',
    whiteSpace: noWrap ?'nowrap' : 'normal',
    cursor: clickable ?'pointer' : 'default',

    '&: hover' : {
        color: inverted ? 
            (clickable ? theme.clickableTextHoverColorInverted : '') :
            (clickable ? theme.clickableTextHoverColor : '')
    },

    '&: active' : {
        color: inverted ?
            (clickable ? theme.clickableTextActiveColorInverted : '') :
            (clickable ? theme.clickableTextActiveColor : '')
    }
}));

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;