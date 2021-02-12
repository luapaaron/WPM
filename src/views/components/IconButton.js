
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

import button from '../../styles/common/button';

const propTypes = {
    hasHover: PropTypes.bool,
    inverted: PropTypes.bool
};

const defaultProps = {
    hasHover: true,
    inverted: false
}

const IconButton = styled('div')(({ theme, hasHover, disabled, inverted }) => ({
    backgroundColor: theme.iconBtnBgColor,
    fill: disabled ? 
        `${theme.iconBtnDisabledIconColor} !important` : 
        (inverted ? theme.iconBtnIconColorInverted : theme.iconBtnIconColor),
    color: disabled ? 
        `${theme.iconBtnDisabledIconColor} !important` : 
        (inverted ? theme.iconBtnIconColorInverted : theme.iconBtnIconColor),
    border: 0,
    pointerEvents: disabled ?'none' : 'auto',

    '&: hover' : {
        fill: hasHover ? 
            (inverted ? theme.iconBtnHoverIconColorInverted : theme.iconBtnHoverIconColor) : 
            (inverted ? theme.iconBtnIconColorInverted : theme.iconBtnIconColor),
        color: hasHover ?
            (inverted ? theme.iconBtnHoverIconColorInverted : theme.iconBtnHoverIconColor) :
            (inverted ? theme.iconBtnIconColorInverted : theme.iconBtnIconColor),
    },

    '&: active' : {
        fill: hasHover ?
            (inverted ? theme.iconBtnActiveIconColorInverted : theme.iconBtnActiveIconColor) :
            (inverted ? theme.iconBtnIconColorInverted : theme.iconBtnIconColor),
        color: hasHover ?
            (inverted ? theme.iconBtnActiveIconColorInverted : theme.iconBtnActiveIconColor) :
            (inverted ? theme.iconBtnIconColorInverted : theme.iconBtnIconColor),
    }
 }), button);

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
