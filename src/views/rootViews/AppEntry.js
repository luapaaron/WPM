import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import cookie from 'js-cookie';

import { redirect } from 'redux-first-router';

import Select from '../components/Select';
import FillButton from '../components/FillButton';
import Header from '../layouts/Header';
import isEmpty from '../../utils/isEmpty';

import { WPM_TOKEN } from '../../constants/cookies';
import { ROUTE_HOME } from '../../constants/routes';

const AppEntryContainer = styled('div')({
    width: '100vw',
    height: 'calc(100vh - 50px)',
    display: 'flex'
});


const FormContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    alignItems: 'center',
    justifyContent: 'center',
    width: 500,
    margin: '0 auto'
});

const LoginBtn = styled(FillButton)({
    margin: '20px 0'
})

const AppEntry = ({ users, actionRedirectToHome }) => {
    

    let optionsUser = [];
    let selectedId = -1;

    const loginUser = () => {
        if(selectedId >= 0){
            cookie.set(WPM_TOKEN, selectedId);
            actionRedirectToHome();
        }
    }

    if(!isEmpty(users)){
        optionsUser = users.map(user => {
            return({ value: user.id, text: user.name });
        });
    }
    return (
        <>
            <Header />
            <AppEntryContainer>
                
                <FormContainer>
                    <Select
                        options={optionsUser}
                        placeholder="Select a user"
                        onChange={id => selectedId = id }
                    />

                    <LoginBtn onClick={() => loginUser()}>Login</LoginBtn>
                </FormContainer>
            </AppEntryContainer>   
        </>
    )
}

export default connect(state => ({
    users: state.user.users
}),{
    actionRedirectToHome: () => dispatch => {
        dispatch(redirect({ type: ROUTE_HOME }));
    }
})(AppEntry);
