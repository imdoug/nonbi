import React,{ useContext, useEffect} from 'react'
import { ChatContext } from '../../src/service/ChatContext';
import { AuthContext } from '../../src/service/AuthContext';

const index = () => {
  const { getChats, userChats } = useContext(ChatContext)
  const { getData, userData } = useContext(AuthContext)
  console.log(userChats.messages)
  useEffect(()=>{
    const data = JSON.parse(window.localStorage.getItem('user'))
    getChats(data.chats[0])
    getData(data.id)
  },[])
  return (
    <div>
      <h1>Chat Id = {userData?.chats}</h1>
      {userChats.messages !== undefined 
        ? <div>
          {userChats.messages.map((message)=>(
            <div>
              <h3>Chat sender = {message.sender}</h3>
              <p>message = {message.message}</p>
            </div>
          ))}
          </div>
        : <h1>Loading ...</h1>
      }
    </div>
  )
}

export default index