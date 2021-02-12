import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import cookie from 'js-cookie';
import Link from 'redux-first-router-link';
import { connect } from 'react-redux';
import { redirect } from 'redux-first-router';

import { WPM_TOKEN } from '../../constants/cookies';
import { MESSAGE_SUCCESS } from '../../constants/messageStatus';
import { actionMessageSet } from '../../reduxModules/common/message';

import profileIcon from '../../assets/icon/profile.png';
import logoutIcon from '../../assets/icon/logout.png';
import headerLogo from '../../assets/img/logo.png';

import FlatButton from '../components/FlatButton';
import IconButton from '../components/IconButton';

import UserDrawer from './UserDrawer';

import clearStorage from '../../utils/clearStorage';

import { ROUTE_HISTORY, ROUTE_LOGIN } from '../../constants/routes';

const HeaderContainer = styled('div')(({ theme }) => ({
    height: 80,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px',
    backgroundColor: theme.headerBgColor,
    position: 'relative',
    flexShrink: 0
}));

const LeftContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%'
})

const LogoContainer = styled('div')({
    display: 'flex',
    height: '100%'
});

const LogoImg = styled('img')({
    width: 102,
    height: 50
});

const Icon = styled('img')({
    width: 30,
    height: 30
});

const HeaderLinksContainer = styled('div')(({theme }) => ({
    display: 'flex',
    alignItems: 'center'
}));

const HeaderFlatButton = styled(FlatButton)(({ theme, isActive }) => ({
    fontSize: 14,
    color: isActive ? `${theme.flatBtnHoverTextColor} ! important` : theme.flatBtnTextColor
}))

const HeaderIconContainer = styled('div')({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer !important',
    marginLeft: 20,
    
    '*':{
        cursor: 'pointer !important'
    }
});

const UserDrawerIcon = styled('img')({
    marginRight: 10,
    width: 30,
    height: 30
});

const LogoWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 52, 
    '> a': {
        height: '100%'
    }
});

const Header = ({
    isLoggedIn,
    locationType,
    actionMessageSet,
    actionRedirectToLogin,
}) => {

    const [isOpenUserDrawer, setIsOpenUserDrawer] = useState(false);

    const onClickToCloseUserDrawer = () => {
        if(isOpenUserDrawer) setIsOpenUserDrawer(false)
    }

    const toggleDrawer = () => {
        setIsOpenUserDrawer(!isOpenUserDrawer);
    }

    const logoutUser = () => {
        clearStorage();
        actionRedirectToLogin();
        actionMessageSet('Successfully Logout.', MESSAGE_SUCCESS)
    }

    useEffect(() => {
        if (isOpenUserDrawer) {
            // add event listener
            window.addEventListener('click', onClickToCloseUserDrawer);
        } else {
            window.removeEventListener('click', onClickToCloseUserDrawer)
        }
        return () => {
            window.removeEventListener('click', onClickToCloseUserDrawer);
        }
    });

    const isSelected = itemRoute => locationType === itemRoute;
    
    const hasLoggedInCookie = cookie.get(WPM_TOKEN);

    return (
        <HeaderContainer>
            <LeftContainer>
                <LogoWrapper>
                    <Link to="/">
                        <LogoContainer>
                            <LogoImg src={headerLogo}/>
                        </LogoContainer>
                    </Link>
                </LogoWrapper>
            </LeftContainer>
            
            <HeaderLinksContainer>
                {
                    (isLoggedIn || hasLoggedInCookie) ? 
                        <Link to='/history'>
                            <HeaderFlatButton isActive={ isSelected(ROUTE_HISTORY) }>History</HeaderFlatButton>
                        </Link>
                    : !isSelected(ROUTE_LOGIN) ? 
                        <Link to='/login'>
                            <HeaderFlatButton isActive={ isSelected(ROUTE_LOGIN) }>Login</HeaderFlatButton>
                        </Link>
                        : null
                    
                }
            </HeaderLinksContainer>

            {
                (isLoggedIn || hasLoggedInCookie) ?
                    <>
                        <HeaderIconContainer onClick={toggleDrawer} >
                            <IconButton>
                                <Icon src={profileIcon} />
                            </IconButton>
                        </HeaderIconContainer>
                        <UserDrawer isOpen={isOpenUserDrawer}>
                            <UserDrawer.Item onClick={logoutUser}><UserDrawerIcon src={logoutIcon} />Logout</UserDrawer.Item>

                        </UserDrawer>
                    </>
                :
                null
            }
        </HeaderContainer>
    );
};

export default connect(state => ({
    locationType: state.location.type,
    isLoggedIn: state.user.isLoggedIn
}),{
    actionMessageSet,
    actionRedirectToLogin: () => dispatch => {
        dispatch(redirect({ type: ROUTE_LOGIN }));
    }
})(Header);