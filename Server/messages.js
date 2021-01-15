const messages = [];

const getAllMessagesByUser = (user) => {
    const allMessages = messages.filter(message => {return message.receiver.includes(user.name) || message.sender.includes(user.name)});
    return allMessages;
}

const removeMessage = (messageToDelete, messageType) => {
    let index = -1;
    if(messageType === 'received'){
        index = messages.findIndex(message => message.receiver === messageToDelete.user.name && message.creationDate.includes(messageToDelete.messageCreationDate));
    }else {
        index = messages.findIndex(message => message.sender === messageToDelete.user.name && message.creationDate.includes(messageToDelete.messageCreationDate));
    }
    if(index !== -1){
        messages.splice(index, 1)[0];
    }

    return messages
}

const writeMessage = (message) => {
    
    if(!message) {
        return false;
    }
    messages.push(message);
    return true;
}

module.exports = {getAllMessagesByUser, writeMessage, removeMessage};