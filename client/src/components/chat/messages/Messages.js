import React from 'react'
import ScrollToBottom  from 'react-scroll-to-bottom'
import Message from '../message/Message'
import './Messages.css';
const Messages = ({ messages, user_id }) => {
    return (
        <ScrollToBottom className="messages">
            {messages.map(message => (
                <Message
                    key={message._id}
                    message={message}
                    current_uid={user_id}
                />
            ))}
        </ScrollToBottom >
    )
}

export default Messages