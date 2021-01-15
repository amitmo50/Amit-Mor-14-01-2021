const setAllMessagesToUser = (allUsersMessages) => {
    return {
        type:'SET_ALL_MESSAGES',
        payload:{allUsersMessages},
    }
}

export default setAllMessagesToUser