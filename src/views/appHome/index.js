import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import Link from 'redux-first-router-link';
import cookie from 'js-cookie';

import Text from '../components/Text';
import FillButton from '../components/FillButton';
import chart from '../../assets/img/chart.png';

import mq from '../../styles/mediaQueries';

import { WPM_TOKEN } from '../../constants/cookies';
import isEmpty from '../../utils/isEmpty';

const HomeContainer = styled('div')(mq({
    display: 'flex',
    flexDirection: ['column', 'column', 'row'],
    marginBottom: 20
    
}));
const HomeWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px 50px'
});

const IntroductionContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
});

const ChartContainer = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
});
const Chart = styled('img')({
    width: 500,
    height: 'auto'
});

const StartChallengeContainer = styled('div')({
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center'
})

const appHome = ({ users }) => {

    const hasLoggedInCookie = cookie.get(WPM_TOKEN);

    let NameText = "";

    if(hasLoggedInCookie){
        const filterUser = users.filter(user => user.id === parseInt(hasLoggedInCookie));
        if(!isEmpty(filterUser)){
            NameText = filterUser[0].name;
        }
    }

    return (
        <HomeWrapper>
            <HomeContainer>
                <IntroductionContainer>
                    <Text fontSize={20} bold>Welcome {NameText}!</Text>
                    <Text>The internet is full of sites to test your typing speed and accuracy. But are there differences, and why did we at this website decide to re-make our test entirely? Our goal was to make a test that would adjust to your natural typing habits, even when making mistakes. And secondly, the original text needs to be close to the text you type so that it's easy to follow and correct typos. In our new test, we've brought the original text directly above the part where you type. The text rolls up automatically at the end of each row, allowing you to keep your focus and typing flowing. You can always see where you're at, thanks to the blue highlight. You won't get stuck when you make a mistake, either - your typo is shown in red, and you can either correct it with backspace or keep on typing. </Text>
                </IntroductionContainer>
                <ChartContainer>
                    <Chart src={chart} />
                </ChartContainer>

                
            </HomeContainer>
            <StartChallengeContainer>
                <Link to='/challenge'><FillButton>Start Challenge</FillButton></Link>
            </StartChallengeContainer>
        </HomeWrapper>
    )
}

export default connect(state => ({
    users: state.user.users
}))(appHome);
