import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import sockerIO from 'socket.io-client'
import './Chat.css'
import Message from '../Message/Message';
import RSTB  from 'react-scroll-to-bottom'
import { Button, Container, Stack, TextField, Typography,IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';



const ENDPOINT = 'https://chat-app-bk1y.onrender.com';
// const ENDPOINT = 'http://localhost:4500/';

let socket;
const Chat = () => {
   // e.preventDefault();
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
            
      return () => {
         socket.disconnect();
         socket.off();
      }
   }, []);
   
   useEffect(() => {
      socket.on('welcome', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message);
      });

      socket.on('sendMessage', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message, data.id);
      });

      socket.on('userJoined', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message);
      });

      socket.on('leave', (data) => {
         setMessages([...messages, data]);
         console.log(data.user, data.message);
      });
   
     return () => {
        socket.off();
     }
   }, [messages])
   
   
   return (
     <>
         <div className='ChatPage'>
            <div className='header'>
                  <h2>CHAT APP</h2>
                  <a href='/'><i class="glyphicon glyphicon-remove"></i></a>
            </div>
            <div className='ChatContainer'>
               <RSTB className='chatBox'>
                  {
                     messages.map((item, i) =>
                        <
                           Message user={item.id === id ? '' : item.user}
                           message={item.message}
                           classes={item.id === id ? 'right' : 'left'}
                        />)
                  }
               </RSTB>
            </div>
            <div className='inputBox'>
                  <input onKeyPress={(e)=>e.key==='Enter'?send():null} type='text' id='chatInput' placeholder='Write a message...' />
                  <button onClick={send} className='sendBtn'>
                     Send
                  </button>
            </div>
         </div>
     </>
  )
}

export default Chat
