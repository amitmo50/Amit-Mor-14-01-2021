import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import './MessagingSystem.css'
import store from '../../store';
import AllMails from './AllMails/AllMails';
import ComposeMail from './ComposeMail/ComposeMail';

const MessagingSystem = () => {
    return (
        <Provider store={store}>
            <div className="messaging-system">
            <h1 className="heading">Messaging System</h1>
                <Router>
                    <div>
                        <ul className="nav-header">
                            <li>
                                <Link to="/">Write Message</Link>
                            </li>
                            <li>
                                <Link to="/allMessages">All Messages</Link>
                            </li>
                        </ul>
                        <div className="content">
                            <Switch>
                                <Route exact path="/">
                                    <ComposeMail />
                                </Route>
                                <Route path="/allMessages">
                                    <AllMails />
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </div>
        </Provider>
    )
}

export default MessagingSystem