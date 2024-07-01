import React, { useState } from 'react';
import './Join.css';
import { Link } from 'react-router-dom';
import { Button, Container, Stack, TextField, Typography } from "@mui/material";

let user;
const sendUser = () => {
  user = document.getElementById("JoinInput").value;
  document.getElementById("JoinInput").value = '';
}

const Join = () => {

  const [name, setname] = useState('');
  // console.log(name);
  return (
     <div className='JoinPage'>
      <div className='JoinContainer'>
        <div className='JC1'>
          <img src={require('../../images/live-chat.png') } />
          <h1>Digital Chat</h1>
          <div>
            <p>Share Your Smile With This World And Find Friends</p>
            <img src={require('../../images/tea.png')} />
            <h2>Enjoy..!</h2>
          </div>
        </div>
        
        <div className='JC2'>
          {/* <TextField
            value={name}
            onChange={(e) => { setname(e.target.value) }}
            id="JoinInput"
            label="Enter Your Name"
            variant="standard"
            type='text'
            /> */}

            {/* <Link onClick={(e) => !name ? e.preventDefault() : null} to='/chat' >
              <Button onClick={sendUser}  className='Joinbtn' type="submit" variant="contained" color="primary">
              Log In
              </Button>
            </Link> */}

          <input
            onChange={(e) => setname(e.target.value)}
            placeholder='Enter Your Name'
            type='text'
            id='JoinInput'
          />
          <Link
            onClick={(e) => !name ? e.preventDefault() : null}
            to='/chat'
          >
            <button onClick={sendUser} className='Joinbtn'>
              Log In
            </button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Join

export {user}