
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import { keyframes } from '@emotion/react'; 

import FlatButton from '../components/FlatButton'

const propTypes = {
    isOpen: PropTypes.bool
}

const defaultProps = {
    isOpen: false
}

const animateTransform = keyframes`
    0% { tranform: scale(0.8); }
    50% { tranform: scale(1); }
    80% { tranform: scale(1.05); }
    100% { tranform: scale(1); }
`;

const UserDrawer = styled('div')(({ theme, isOpen }) => ({
    display: isOpen ?'flex' : 'none',
    width: 200,
    backgroundColor: theme.UserDrawerBgColor,
    borderRadius: 10,
    border: '1px solid #EEEEEE',
    boxShadow: '0 2px 3px 0 #ccc',
    position: 'absolute',
    top: 63,
    right: 13,
    zIndex: 51,
    padding: '10px 10px 15px',
    flexDirection: 'column',
    opacity: isOpen ? 1 : 0,
    animation: isOpen ?`${ animateTransform } 0.3s` : '',
    transform: isOpen ?'scale(1) ' : '',
    transformOrigin: 'top right',
    transition: 'opacity 0.2s linear, visibility 0.3s linear, transform 0.3s linear',
    ': before': {
        content: "''",
        position: 'absolute',
        top: '-10px',
        right: 11,
        borderStyle: 'solid',
        borderWidth: '10px 20px 10px 0',
        borderColor: 'transparent #ffffff transparent transparent',
        transform: 'rotate(90deg)'
    },
    ': after': {
        content: "''",
        position: 'absolute',
        width: 0,
        height: 0,
        top: '-8px',
        right: 11,
        borderBottom: '9px solid #fff',
        borderTopColor: 'inherit'
    }
}));

const UserDrawerItem = styled(FlatButton)(({ theme, isLink, inverted }) => ({
    width: '100%',
    cursor: 'pointer',
    height: 50,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    boxSizing: 'border-box',
    justifyContent: 'inherit',
    color: isLink ? '#878787 !important' : theme.secondaryColor,
    fill: isLink ? '#878787 !important' : theme.secondaryColor,

    '&: hover': {
        backgroundColor: theme.flatBtnHoverBgColor,
        color: isLink ? '#1975d2 !important' : (inverted ? theme.flatBtnHoverTextColorInverted : theme.flatBtnHoverTextColor),
        fill: isLink ? '#1975d2 !important' : (inverted ? theme.flatBtnHoverTextColorInverted : theme.flatBtnHoverTextColor)
    },

    '&: active': {
        backgroundColor: theme.flatBtnActiveBgColor,
        color: isLink ? '#1975d2 !important' : (inverted ? theme.flatBtnActiveTextColorInverted : theme.flatBtnActiveTextColor),
        fill: isLink? '#1975d2 !important': (inverted ? theme.flatBtnActiveTextColorInverted : theme.flatBtnActiveTextColor)
    },

    '&: disabled': {
        color: inverted ? theme.flatBtnDisabledTextColorInverted : theme.flatBtnDiabledTextColor,
        fill: inverted ? theme.flatBtnDisabledTextColorInverted : theme.flatBtnDiabledTextColor,
        PointerEvents: 'none'
    }
}));

UserDrawer.Item = UserDrawerItem;
UserDrawer.propTypes = propTypes;
UserDrawer.defaultProps = defaultProps;

export default UserDrawer;