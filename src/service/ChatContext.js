import React, { createContext,useState } from 'react'
import { db } from '../config/firebase.config'
import { setDoc, doc, getDoc, collection, getDocs, Timestamp, where, documentId, addDoc } from "firebase/firestore";

export const ChatContext = createContext()

 

export const ChatProvider = ({children}) => {
      const [userChats, setUserChats ] = useState('')
      const [currChatMess, setCurrChatMess] = useState()

      const getChats =  async (uid) =>{
            const docRef = doc(db, "chats", where("users", "array-contains", `$${uid}`));
            const docSnap = await getDocs(docRef);
            console.log(docSnap)
            if (docSnap.exists()) {
                  console.log("Chat data:", docSnap.data());
                  setUserChats(docSnap.data())
            } else {
            // doc.data() will be undefined in this case
                  console.log("No such document!");
            }
      }     

      // get open chat and its messages 
      const getCurrentChat =  async (uid) =>{
                  const docRef = doc(db, "chats", uid);
                  const docSnap = await getDoc(docRef);
                  if (docSnap.exists()) {
                        console.log("Chat data:", docSnap.data());
                        setUserChats(docSnap.data())
                  } else {
                  // doc.data() will be undefined in this case
                        console.log("No such document!");
                  }
      }
      // self-explain 
      const createChat = async (muid, ouid) =>{
            // creation 
            const users = [muid, ouid]
            const sampleChat = {
                  createdAt: Timestamp.now(),
                  messages: [],
                  users
            }
            const messagesSnap = await addDoc(collection(db, "chats"), sampleChat);
            const chatId = messagesSnap.id
            // update m chats arr
            const mRef = await getDoc(doc(db, 'users', muid))
            if (mRef.exists()) {
                  const user = {...mRef.data()}
                  user.chats.push(chatId)
                  const Ref = await setDoc(doc(db, 'users', muid),{
                        ...user
                  })
            }else{
                  // add uid to find out which user broke later on 
                  console.log("Could not update users chat ");
            }
            // update o chats arr
            const oRef = await getDoc(doc(db, 'users', ouid))
            if (oRef.exists()) {
                  const user = {...oRef.data()}
                  user.chats.push(chatId)
                  const Ref = await setDoc(doc(db, 'users', ouid),{
                        ...user
                  })
            }else{
                  console.log("Could not update users chat ");
            }
      }
      // self-explain 
      const addMessage = async (uid, chat, user) =>{
            const message = {
                  sentAt: Timestamp.now(),
                  sender: user,
                  message: "Hello hi b"
            }
            const docData = {
                  users: chat.users,
                  messages: [...chat.messages, message ],
                  createdAt: chat.createdAt,  
            }
            const messagesSnap = await setDoc(doc(db, 'chats', uid), docData);
            getChats(uid)
      }
  return (
    <ChatContext.Provider value={{getCurrentChat, userChats, currChatMess, addMessage, createChat}}>
          {children}
    </ChatContext.Provider>
  )
}
