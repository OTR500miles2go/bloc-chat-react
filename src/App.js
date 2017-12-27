import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBaEgNOjN0zBUh-KtkGyo2gnd44EVqR1jQ",
  authDomain: "blocchatreact-728d7.firebaseapp.com",
  databaseURL: "https://blocchatreact-728d7.firebaseio.com",
  projectId: "blocchatreact-728d7",
  storageBucket: "blocchatreact-728d7.appspot.com",
  messagingSenderId: "825402591416"
};
firebase.initializeApp(config);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRoom: ' --- ',
      user: ''
    };
  }

  appCallback = (roomListData) => {
    this.setState ({ currentRoom: roomListData.name });
  }

  setUser(user) {
    if (user) {
      this.setState({ user: user.displayName });
    } else {
      this.setState({ user: "Guest" });
    }
  }


  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BlocChat</h1>
        </header>
        
        <nav>
          <User
            firebase={firebase}
            currentUsername={this.state.user}
            setUser={(e) => this.setUser(e)}
          />
        </nav>

        <div className="content">

          <div className="listing">
            <RoomList 
              firebase={firebase} 
              roomListCallback={this.appCallback} 
            />
          </div>

          <div className="listing">
            <p className="message-header">Current Chat Room - {this.state.currentRoom}</p>
            <MessageList 
              firebase={firebase} 
              messageCurrentRoom={this.state.currentRoom} 
            />
          </div>

        </div>
      </div>
    );
  }
}

export default App;