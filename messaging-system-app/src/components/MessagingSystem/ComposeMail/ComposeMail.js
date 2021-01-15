import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import queryString from 'query-string';

import './ComposeMail.css';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

const ComposeMail = () => {
    
    const [sender, setSender] = useState('');
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [textContent, setTextContent] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [isAlert, setIsAlert] = useState(false);

    useEffect(() => {
        let parsed = queryString.parse(window.location.search);
        setAlertMessage(parsed.alert);
        setIsAlert(true);
        const timer = setTimeout(() => {
            setIsAlert(false);
        }, 3000);
        return () => clearTimeout(timer);
    },[])

    return (
        <div className="compose-mails">
            {isAlert && alertMessage?(<Alert severity="success">{alertMessage}</Alert>):null}
            <h2 className="message-heading">New Message</h2>
            <form action="https://backend-messaging-system.herokuapp.com/writeMessage" method="POST" className="root-form" noValidate autoComplete="on">
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item xs={6}>
                        <Input
                            type="text"
                            name="sender"
                            value={sender}
                            onChange={(e) => {setSender(e.target.value)}}
                            id="sender-id-input"
                            placeholder="Sender Id"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                            style={{margin:'0 10px 0 0', width: '100%'}}
                        />
                        </Grid>
                        <Grid item xs={6}>    
                            <Input
                                type="text"
                                name="receiver"
                                value={receiver}
                                onChange={(e) => {setReceiver(e.target.value)}}
                                id="receiver-id-input"
                                placeholder="Receiver Id"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                }
                                style={{margin:'0 0 0 10px', width: '100%'}}
                            />
                        </Grid>
                    </Grid>
                <TextField 
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                    style={{margin: '10% 0 0 0', width: '100%'}} 
                    id="subject-input" 
                    label="Subject" 
                />
                <TextField
                    type="text"
                    name="content"
                    value={textContent}
                    onChange={(e) => {setTextContent(e.target.value)}}
                    id="content-text-input"
                    label="Mail Content"
                    style={{margin: '5% 0 0 0', width: '100%'}} 
                    multiline
                    rowsMax={10}
                    variant="outlined"
                />
                {(!textContent || !subject || !receiver|| !sender) ? (
                    <button style={{backgroundColor: '#eeed' }} type="submit" disabled value="Submit">
                        <i className="far fa-paper-plane"></i> Send
                    </button>
                ) :(
                    <button type="submit" value="Submit">
                        <i className="far fa-paper-plane"></i> Send
                    </button>
                )}
                
            </form>
        </div>
    )
}


const mapStateToProps = ({MessagingSystemData}) => {
    return {MessagingSystemData}
}

export default connect(mapStateToProps)(ComposeMail);