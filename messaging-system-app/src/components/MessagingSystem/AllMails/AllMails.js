import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import './AllMails.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import Alert from '@material-ui/lab/Alert';
import setAllMessagesToUser from '../../../store/actions/MessagingSystemActions';

const AllMails = ({MessagingSystemData, dispatch}) => {
    const [userId, setUserId] = useState({name: ''});
    const [isDelete, setIsDelete] = useState(false);
    
    useEffect(() => {
        if(userId.name !== ''){
            
            const url = `https://backend-messaging-system.herokuapp.com/getAllMessages/userId?name=${userId.name}`;
            fetch(url,{headers: {
                // eslint-disable-next-line no-useless-concat
                'Authorization': 'WWW-Authenticate ' + 'Basic'
            },})
                .then(res => res.json())
                .then(allUserMessages => {
                    allUserMessages['userId'] = userId.name;
                    dispatch(setAllMessagesToUser(allUserMessages));
                });
        }
        
    }, [userId,dispatch]);

    const deleteMessage = (e, messageType) => {

        let messageToDeleteDate = '';
        if(messageType === 'sent'){
            messageToDeleteDate = MessagingSystemData.sentMessages[e.target.id].creationDate;
        }else{
            messageToDeleteDate = MessagingSystemData.receivedMessages[e.target.id].creationDate;
        }
  
        const url = `https://backend-messaging-system.herokuapp.com/deleteMessage/userId?name=${userId.name}&messageType=${messageType}&creationDate=${messageToDeleteDate}`;
        fetch(url,{headers: {
            // eslint-disable-next-line no-useless-concat
            'Authorization': 'WWW-Authenticate ' + 'Basic'
        },})
            .then(res => res.json())
            .then(allUserMessages => {
                allUserMessages['userId'] = userId.name;
                dispatch(setAllMessagesToUser(allUserMessages));
            });
        setIsDelete(true);
       
    }
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDelete(false);
        }, 3000);
        return () => clearTimeout(timer);

    }, [isDelete])

    const showMails = (e, mailType) => {
        // Declare all variables
        let i, tabcontent, tablinks;
      
        // Get all elements with class="tabcontent" and hide them
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
          tabcontent[i].style.display = "none";
        }
      
        // Get all elements with class="tablinks" and remove the class "active"
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
          tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
      
        // Show the current tab, and add an "active" class to the button that opened the tab
        document.getElementById(mailType).style.display = "block";
        e.currentTarget.className += " active";
      }

    return (
        <div className="all-mails">
            {isDelete ? (<Alert severity="success">Message Deleted Successfully</Alert>) : null}
            <Input
                id="user-id-input"
                placeholder="User Id"
                value={userId.name}
                onChange={(e) => {setUserId({name: e.target.value})}}
                startAdornment={
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                }
                style={{margin:'0 10px 0 0', width: '100%'}}
            />
            <div className="all-mails-tab">
                <button 
                    className="tablinks" 
                    onClick={(e) => showMails(e, 'sent-messages')}
                    ><i className="far fa-paper-plane"></i> Sent</button>
                <button 
                    className="tablinks" 
                    onClick={(e) => showMails(e, 'received-messages')}
                    ><i className="far fa-envelope"></i> Received</button>
            </div>
            <hr/>
            <div id="sent-messages" className="tabcontent">
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Receiver</td>
                            <td>Subject</td>
                            <td>Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userId.name?MessagingSystemData.sentMessages.map((sentMessage, index) => <tr key={index} id={index}>
                            <td><i id={index} className="fas fa-trash" onClick={(e) => deleteMessage(e, 'sent')}></i></td>
                            <td>{sentMessage.receiver}</td>
                            <td>{sentMessage.subject}</td>
                            <td>{sentMessage.textMessage}</td>
                        </tr>):null}
                    </tbody>
                </table>
            </div>

            <div id="received-messages" className="tabcontent">
                <table>
                    <thead>
                        <tr>
                            <td></td>
                            <td>Sender</td>
                            <td>Subject</td>
                            <td>Message</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userId.name?MessagingSystemData.receivedMessages.map((receivedMessage, index) =>
                        <tr key={index} id={index}>
                            <td><i id={index} className="fas fa-trash" onClick={(e) => deleteMessage(e, 'received')}></i></td>
                            <td>{receivedMessage.sender}</td>
                            <td>{receivedMessage.subject}</td>
                            <td>{receivedMessage.textMessage}</td>
                        </tr>):null}
                    </tbody>
                </table>
                
            </div>

        </div>
    )
}


const mapStateToProps = ({MessagingSystemData}) => {
    return {MessagingSystemData}
}

export default connect(mapStateToProps)(AllMails);