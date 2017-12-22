import React, { Component } from 'react';
import './RoomList.css';

class RoomList extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = {
      rooms: [],
      newRoomName: ''
    }
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      this.setState({ rooms: this.state.rooms.concat(snapshot.val().name) });
    })
  }

  handleChange(event) {
    this.setState({ newRoomName: event.target.value })
  }

  handleClick() {
    this.roomsRef.push({ name: this.state.newRoomName });
    this.setState({ newRoomName: '' })
  }

  render() {
    return (
      <div>
        <div> Bloc Chat </div>
        <div className="side-panel"> 
          <p className="side-header">Select your room </p>
        <ul className="room-list">
          {
            this.state.rooms.map((roomName, index) => {
                return <RoomItem key={index} roomName={roomName} />
            })
          }
        </ul>
        <form>
          <input type="text" value={this.state.newRoomName} onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick.bind(this)}> + </button>
        </form>
        </div>
      </div>
    )
  }
}

const RoomItem = (props) => {
  return (
    <li> {props.roomName} </li>
  )
}


export default RoomList;