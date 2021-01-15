const users = [];
loginUser = {name: ''};

const addUser = (userName) => {
    const existingUser = users.find((user) => user === userName);
    if(existingUser) {
        return;
    }
    const user = {userName};
    users.push(user);
}

const addLoginUser = (userName) => {
    loginUser.name = userName;
}

const joinInUser = (userName) => {
    addUser(userName)
    return true;
} 

const getUserMailInfo = (allMessages, user) => {
    const receiveMail = allMessages.filter(message => message.receiver === user.name);
    const sendMail = allMessages.filter(message => message.sender === user.name);
    const userMailInfo = {
        receivedMails: receiveMail,
        sentMails: sendMail
    }
    return userMailInfo
}

module.exports = {getUserMailInfo, addUser, joinInUser, addLoginUser};