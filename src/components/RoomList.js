import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      newRoomName: ''
    };
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.setRoom = this.setRoom.bind(this);
    this.createRoom = this.createRoom.bind(this);
  }

  setRoom(e) {
    this.setState({ newRoomName: e.target.value });
  }

  createRoom(e) {
    e.preventDefault();
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: '' })
  }

  chooseRoom(room) {
    this.props.roomListCallback(room);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  render() {
    return (
      <div>
        <ul className="chat-room">
          {
            this.state.rooms.map((chatRoom, index) => {
              return <ul className="room-name" key={chatRoom.key} onClick={(e) => this.chooseRoom(chatRoom)}><a>{chatRoom.name}</a></ul>
            })
          }
        </ul>
        <form onSubmit={this.createRoom}>
          <input type='text' placeholder="Create chat room" value={this.state.newRoomName} onChange={this.setRoom} />
          <button type='submit'> + </button>
        </form>
      </div>
    );
  }
}

export default RoomList;