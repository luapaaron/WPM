import React from 'react';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import cookie from 'js-cookie';

import { WPM_TOKEN } from '../../constants/cookies';
import isEmpty from '../../utils/isEmpty';
import Table from '../components/Table';
import Text from '../components/Text';

import convertUnixToDate from '../../utils/unixToDate';

const HistoryWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px',

    '>*:first-of-type':{
        marginBottom: 20
    }
});


const AppHistory = ({ users }) => {

    const hasLoggedInCookie = cookie.get(WPM_TOKEN);

    let NameText = "";
    let Data = [];

    if(hasLoggedInCookie){
        const filterUser = users.filter(user => user.id === parseInt(hasLoggedInCookie));
        if(!isEmpty(filterUser)){
            NameText = filterUser[0].name;
            Data = filterUser[0].history;
        }
    }

    return (
        <HistoryWrapper>
            <Text fontSize={20}> Hi {NameText}, here is your History</Text>

            {
                (isEmpty(Data)) ? <span> No history record yet.</span> :
                <Table col={5} >
                    <Table.THead>
                        <Table.TR>
                            <Table.TH>Date</Table.TH>
                            <Table.TH>WPM</Table.TH>
                            <Table.TH>Errors</Table.TH>
                            <Table.TH>Accuracy</Table.TH>
                            <Table.TH>Completion Rate</Table.TH>
                        </Table.TR>
                    </Table.THead>
                    <Table.TBody isStripped>
                        
                        {
                            Data.map(record => {
                                return (
                                    <Table.TR key={record.Timestamp}>
                                        <Table.TD>{convertUnixToDate(record.Timestamp)}</Table.TD>
                                        <Table.TD>{record.WPM}</Table.TD>
                                        <Table.TD>{record.Errors}</Table.TD>
                                        <Table.TD>{record.Accuracy}</Table.TD>
                                        <Table.TD>{record.CompletionRate}%</Table.TD>
                                    </Table.TR>
                                )
                            })
                        }
                        
                    </Table.TBody>
                </Table>
            }
            
        </HistoryWrapper>
    )
}

export default connect(state => ({
    users: state.user.users
}))(AppHistory);
