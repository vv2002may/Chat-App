import React from 'react'
import './Message.css'

const Message = ({user,message,classes}) => {
   if (user) {
      return (

         `${user}` === 'Admin' ?  
         
            <div className='messageBox center'>
               {/* {`${user} : ${message}`} */}
               {`${message}`}
            </div>
            
            :
         
            <div className={`messageBox ${classes}`}>
               {`${user} : ${message}`}
            </div>


      //    <div className={`messageBox ${classes}`}>
      //       {`${user} : ${message}`}
      //   </div>
      )
   }
   else {
      return (
         <div className={`messageBox ${classes}`}>
            {`You : ${message}`}
        </div>
      )
   }
}

export default Message