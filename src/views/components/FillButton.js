
import styled from '@emotion/styled';
import button from '../../styles/common/button';
import PropTypes from 'prop-types';

const propTypes = {
    fontSize: PropTypes.number,
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}

const defaultProps = {
    fontSize: 16,
    width: 'auto'
}

const FillButton = styled('button')({
    display: 'flex',
},({
    theme, round, fontSize, width
}) => ({
    fontSize,
    padding: round ? 0 : '10px 40px !important',
    minWidth: round ?'auto' : 126,
    width: round ? '55px' : width,
    height: round ? '55px' : 'auto',
    borderRadius: round ?'50%' : '20px',
    backgroundColor: theme.fillBtnBgColor ,
    color: theme.fillBtnTextColor,
    fill: theme.fillBtnTextColor,
    border: 0,
    pointerEvents: 'auto',

    '&: hover': {
        backgroundColor: theme.fillBtnHoverBgColor
    },

    '&: active': {
        backgroundColor: theme.fillBtnActiveBgColor,
    },

    '&: disabled': {
        backgroundColor: theme.fillBtnDisabledBgColor,
        pointerEvents: 'none'
    }
}),button);


FillButton.propTypes = propTypes;
FillButton.defaultProps = defaultProps;


export default FillButton;
