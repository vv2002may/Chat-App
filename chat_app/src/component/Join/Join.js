import React, { useState } from 'react';
import './Join.css';
import {Link} from 'react-router-dom'

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
        <img src={require('../../images/logo.png') } />
        <h1>CHAT APP</h1>
        <input onChange={(e)=>setname(e.target.value)} placeholder='Enter Your Name' type='text' id='JoinInput' />
        <Link onClick={(e)=>!name ?e.preventDefault():null} to='/chat' ><button onClick={sendUser} className='Joinbtn'>Log In</button></Link>
      </div>
    </div>
  )
}

export default Join

export {user}