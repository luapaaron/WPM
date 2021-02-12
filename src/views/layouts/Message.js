import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

import { actionMessageReset } from '../../reduxModules/common/message';

import Text from '../components/Text';

const MessageContainer = styled('div')(({ style }) => ({
    padding: '10px 20px',
    backgroundColor: '#bdc3c7',
    height: 40,
    marginBottom: 10,
    transition: 'margin 0.33s',
    position: 'fixed',
    bottom: 20,
    transform: 'translateX(-50%)',
    left: '50%',
    borderRadius: 20
}));

const Message = ({ message, actionMessageReset, ...others }) => {

    useEffect(() => {
        if(message.isOpen){
            setTimeout(() => {
                actionMessageReset();
            }, 3000)
        }
    },[message.isOpen]);

    if (!message.isOpen) return null;
    
    return (
        <MessageContainer status={message.status}  {...others} >
            <Text>{message.text}</Text>
        </MessageContainer>
    );
};

export default connect(state => ({
    message: state.message
}), {
    actionMessageReset
})(Message);