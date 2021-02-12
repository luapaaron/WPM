
import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { connect } from 'react-redux';

import theme from '../../styles/themes';

import ViewPortLayer from '../components/ViewPortLayer';
import Message from '../layouts/Message';

import keyboardImg from '../../assets/img/keyboard.png'

const Container = styled(ViewPortLayer)({
    userSelect: 'none',
    backgroundImage: `url(${keyboardImg})`,
    backgroundPosition: 'bottom right',
    backgroundSize: '50%',
    backgroundRepeat: 'no-repeat'
});

const ThemeRoot = ({ theming, children }) => {
    const themeSelected = theme[theming];
    return (
        <ThemeProvider theme={themeSelected}>
            <Container>
                {children}
                <Message />
            </Container>
        </ThemeProvider>
    )
};

export default connect(state => ({
    theming: state.config.theme
}))(ThemeRoot);