import React from 'react';
import { Route } from 'react-router-dom';
import ChatList from '../containers/ChatListView';
import ChatDetail from '../containers/ChatDetailView';
import Login from '../containers/Login';
import Signup from '../containers/Signup';


const BaseRouter = (props) => {
    const { logout } = props;
    console.log(props)
    return (
        <div>
            <Route 
                exact path="/chats" 
                render={(props) => 
                <ChatList {...props} logout={logout} />}
            />
            <Route exact path="/chats/:chatID" component={ChatDetail}/>
            <Route exact path="/" component={Login}/>
            <Route exact path="/signup" component={Signup}/>
        </div>
    )
}

export default BaseRouter;