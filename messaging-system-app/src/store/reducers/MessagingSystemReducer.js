
const initialMessagingSystemState = {
    receivedMessages:[],
    sentMessages:[],
    userId:'',
}

const MessagingSystemReducer = (state = initialMessagingSystemState, action) => {
    const {type, payload} = action;

    switch (type) {
        case 'SET_ALL_MESSAGES': {
            return {
                ...state,
                receivedMessages: payload.allUsersMessages.receivedMails,
                sentMessages: payload.allUsersMessages.sentMails,
                userId: payload.allUsersMessages.userId,
            };
        }
        default: {
            return state;
        }
    }
}

export default MessagingSystemReducer;