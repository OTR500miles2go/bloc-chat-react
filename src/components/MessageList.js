import React, { Component } from 'react';
import './MessageList.css';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: ''
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  setMessage(e) {
    this.setState({ newMessage: e.target.value });
  }
  sendMessage(e) {
    e.preventDefault();
    if (this.props.messageCurrentRoom === undefined || this.props.user === null) {
      this.setState({ newMessage: '' });
    } else {
      this.messagesRef.push({
        username: 'dgayden',
        roomId: this.props.messageCurrentRoom,
        sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        content: this.state.newMessage
      });
    }
    this.setState({ newMessage: '' });
  }
  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });
  }

  prettyDateStamp(epochDate) {
    const myDate = new Date(epochDate);
    return myDate.toString();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.messages.map((message) => {
              const viewDate = this.prettyDateStamp(message.sentAt);
              if (message.roomId === this.props.messageCurrentRoom) {
                return <ul key={message.key} >{viewDate} {message.username} : {message.content}</ul>
              } else {
                return null;
              }
            })
          }
        </ul>
        <form className="new-message" onSubmit={this.sendMessage}>
          <input className="box" placeholder="Type message here..." type='text' value={this.state.newMessage} onChange={this.setMessage} />
          <button className="message-button" type='submit'>Send/Update message</button>
        </form>
      </div>
    );
  }
}
export default MessageList;