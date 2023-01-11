import React,{ useContext, useEffect} from 'react'
import { ChatContext } from '../../src/service/ChatContext';
import { AuthContext } from '../../src/service/AuthContext';

const index = () => {
  const { getCurrentChat, userChats, addMessage, createChat } = useContext(ChatContext)
  const { getData, userData } = useContext(AuthContext)
  console.log(userChats)
  useEffect(()=>{
    const data = JSON.parse(window.localStorage.getItem('user'))
    if(data.chats){
      console.log(data.chats)
      // getCurrentChat(data.chats[0])
    }
    getData(data.id)
  },[])
  return (
    <>

    <div>
      <div>
        USER CHATS : <button onClick={()=>{createChat(userData.id, "XVAabd8fspdmzMXYDiDAzSqXG8l2")}}>create new chat</button>
      </div>
      {/* <div>
      <button onClick={()=>{addMessage(userData.chats[0], userChats, userData.id)}}>ADD TO MESSAGE ARRAY</button>
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
      </div> */}
    </div>
    </>
  )
}

export default index