import React from 'react';
import { KeyboardAvoidingView, Keyboard, StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { WebSocket } from 'ws';


const URL = 'ws://54.172.50.207'
const ws = new WebSocket.Server(URL)
const msgData = {
  "user": "rob",
      "channel": "test",
      "text": "Hello",   "type": "message"
  }

  const msg = JSON.stringify(msgData)

export default class App extends React.Component {
  state = {
    typingText: null,
    isLoadingEarlier: false,
    loadEarlier: true,
    messages: [
      {
        _id: 1,
        text: "hello",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Rob",
          avatar: 'https://i.pinimg.com/originals/45/31/5f/45315f7f20a92b8f5d5cd2cddf8791a4.jpg',
        },
        image: 'https://i.giphy.com/media/l4FGvUYI0tETAQwGk/giphy.webp',
        
      }
    ]
  };


  
  
     
     
          
     
  getData(){
    try{
      ws.on('open', function open() {
          ws.send(msg)
      });
  
      ws.on('message', function incoming(data){
          console.log(data);
      })
  }
  catch(err){
      console.log("Can't send message " + err);
  }

  }

  onRecieve(){
    data = getData(msg)

    this.setState(previousState => {
      messages: GiftedChat.append(previousState.messages, {
        _id: Math.round(Math.random() * 1000000),
        text: data.text,
        createdAt: new Date(),
        user:{
          _id: 1,
          name: "Rob",
          avatar: 'https://i.pinimg.com/originals/45/31/5f/45315f7f20a92b8f5d5cd2cddf8791a4.jpg',
        }
      });

    
  })

    
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }
  render() {
    return (
      
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <GiftedChat 
        onSend={messages=>this.onSend(messages)}
        user={{
          _id: 3,
          name: "Yash",
          avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jon_Stewart_MFF_2016.jpg/220px-Jon_Stewart_MFF_2016.jpg"
        }}
        showUserAvatar={true} alwaysShowSend={true} messages={this.state.messages}/>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      
      
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',


  },
});

