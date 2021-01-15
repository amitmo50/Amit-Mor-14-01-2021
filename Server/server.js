const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const auth = require('./auth');
const PORT = process.env.PORT || 5000;

const jsonParser = bodyParser.json()
app.use(cors())
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const { getAllMessagesByUser, writeMessage, removeMessage } = require('./messages.js');
const { addUser, getUserMailInfo } = require('./users.js');

// auth method on the beginning when trying to compose the first message
app.use(auth);

// get all messages by user 
app.get('/getAllMessages/userId',jsonParser, (req, res) => {
    const userName = req.query.name;
    const user = {
        name: userName
    };
    const userMessages = getAllMessagesByUser(user);
    const userMailInfo = getUserMailInfo(userMessages,user);
    res.json(userMailInfo);
});

// write and post a message to user
app.post('/writeMessage',urlencodedParser, (req, res) => {
    let messageToUser = 'The Message was sent successfully';
    const receiver = req.body.receiver;
    const sender = req.body.sender;
    const currentdate = new Date();

    const datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const message = {
        sender:sender,
        receiver: receiver,
        textMessage: req.body.content,
        subject:req.body.subject,
        creationDate: datetime
    };
    // check if the receiver and the sender are a users in system, if not addinf them
    addUser(receiver);
    addUser(sender);
    const isSentMessage = writeMessage(message);
    if(!isSentMessage){
        messageToUser = 'Something went wrong, The message was not sent';
    }
    // return alert message to client when succeeded to push message
    res.redirect('https://messaging-system-site.netlify.app/?alert=' + encodeURIComponent(messageToUser));
});

// Remove message of user 
app.get('/deleteMessage/userId', (req, res) => {
    const userName = req.query.name;
    const messageCreationDate = req.query.creationDate;
    const messageType = req.query.messageType;

    const messageToDelete = {
        user: {name:userName},
        messageCreationDate: messageCreationDate
    };
    let newMessages = removeMessage(messageToDelete, messageType);
    const userMailInfo = getUserMailInfo(newMessages,messageToDelete.user);
    res.send(userMailInfo);
});


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
