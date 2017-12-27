import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
      currentRoom: ' --- '
    };
  }

  appCallback = (roomListData) => {
    this.setState ({ currentRoom: roomListData.name });
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BlocChat</h1>
        </header>

        <div className="content">

          <div className="room-list">
            <RoomList firebase={firebase} roomListCallback={this.appCallback} />
          </div>

          <div className="message-header">

            <div className="message-list">
              <p className="message-header">Current Chat Room - {this.state.currentRoom}</p>
              <MessageList firebase={firebase} messageCurrentRoom={this.state.currentRoom} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;