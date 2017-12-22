import React, { Component } from 'react';
import * as firebase from 'firebase';
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to BlocChat</h1>
        </header>
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;