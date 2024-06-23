import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import sockerIO from 'socket.io-client'
import './Chat.css'
import Message from '../Message/Message';
import RSTB  from 'react-scroll-to-bottom'

const ENDPOINT = 'https://chat-app-server-teal.vercel.app/';

let socket;
const Chat = () => {

   const [id, setid] = useState("");
   const [messages, setMessages] = useState([])
   const send = () => {
      const message = document.getElementById('chatInput').value;
      socket.emit('message', { message, id});
      document.getElementById('chatInput').value = "";
   }

   console.log(messages);
   useEffect(() => {
      socket = sockerIO(ENDPOINT, { transports: ['websocket'] });

      socket.on('connect', () => {
         // alert('connected');
         setid(socket.id);
      })
     
      socket.emit('joined', { user });

      socket.on('welcome', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message);
      })
      
      socket.on('userJoined', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message);
      })

      socket.on('leave', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message);
      })
      return () => {
         socket.disconnect();
         socket.off();
      }
   }, []);
   
   useEffect(() => {
      socket.on('sendMessage', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message, data.id);
     })
   
     return () => {
        socket.off();
     }
   }, [messages])
   
   
  return (
     <div className='ChatPage'>
        <div className='ChatContainer'>
           <div className='header'>
              <h2>CHAT APP</h2>
              <a href='/'><i class="glyphicon glyphicon-remove"></i></a>
           </div>
           <RSTB className='chatBox'>
              {messages.map((item,i)=> <Message user={item.id===id?'' : item.user} message={item.message} classes={item.id===id?'right' : 'left'}/>)}
           </RSTB>
           <div className='inputBox'>
              <input onKeyPress={(e)=>e.key==='Enter'?send():null} type='text' id='chatInput' />
              <button onClick={send} className='sendBtn'>Send</button>
           </div>
        </div>
    </div>
  )
}

export default Chat