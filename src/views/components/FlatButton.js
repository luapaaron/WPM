
import styled from '@emotion/styled';
import button from '../../styles/common/button';
import PropTypes from 'prop-types';

const propTypes = {
    fontSize: PropTypes.number,
    textTransform: PropTypes.string,
    inverted: PropTypes.bool,
    isActive: PropTypes.bool
}

const defaultProps = {
    fontSize: 16,
    textTransform: 'initial',
    inverted: false,
    isActive: false
}

const FlatButton = styled('button')({
    lineHeight: '18px',
    border: 0
},({
    theme, fontSize, bold, textTransform, inverted, isActive
}) => ({
    textTransform,
    fontSize,
    backgroundColor: theme.flatBtnBgColor,
    color: (isActive ? `${theme.flatBtnTextColor} !important` : theme.flatBtnTextColor),
    fill: (isActive ? `${theme.flatBtnTextColor} !important` : theme.flatBtnTextColor),
    fontWeight: bold ? 'bold' : 'normal',

    '&: hover': {
        backgroundColor: theme.flatBtnHoverBgColor,
        color: theme.flatBtnHoverTextColor,
        fill: theme.flatBtnHoverTextColor
    },

    '&: active': {
        backgroundColor: theme.flatBtnActiveBgColor,
        color: theme.flatBtnActiveTextColor,
        fill: theme.flatBtnActiveTextColor
    },

    '&: disabled': {
        color: theme.flatBtnDiabledTextColor,
        fill: theme.flatBtnDiabledTextColor,
        PointerEvents: 'none'
    }
}), button);

FlatButton.propTypes = propTypes;
FlatButton.defaultProps = defaultProps;

export default FlatButton;

