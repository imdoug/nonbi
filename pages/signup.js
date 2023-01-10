import React, {useState} from 'react'
import { auth } from '../src/config/firebase.config'
import { createUserWithEmailAndPassword } from "firebase/auth";

const signup = () => {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPass] = useState('')
      const [password2, setPass2] = useState('')
      const handleSignUp = (e) =>{
            e.preventDefault()
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log(user)
                  // ...
            })
            .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  // ..
            });
      }
      return (
            <div>
                  <form id='signup-form' className='signup' onSubmit={(e) => handleSignUp(e)}>
                        <div>
                              <label htmlFor='name'>Full Name</label>
                              <input 

                                    type="text"
                                    name='name'
                                    id='name'
                                    required
                                    maxLength="32"
                                    onChange={(e)=>{setName(e.currentTarget.value)}}
                                    value={name}
                              />
                        </div>
                  <div>
                        <label htmlFor='email'>Email Address</label>
                        <input 

                              type="email"
                              name='email'
                              id='email'
                              required
                              minLength="10"
                              maxLength="50"
                              onChange={(e)=>{setEmail(e.currentTarget.value)}}
                              value={email}
                        />
                  </div>
                  <div>
                        <label 
                              htmlFor='password1'>
                                    Password
                        </label>
                        <input 
                  
                              type="password"
                              name='new-password'
                              id="password1"
                              required
                              minLength="8"
                              onChange={(e)=>{setPass(e.currentTarget.value)}}
                              value={password}
                        />
                  </div>
            <div>
                  <label htmlFor='password2'>Password Confirmation</label>
                  <input 
            
                        type="password"
                        name='new-password2'
                        id="password2"
                        required
                        minLength="8"
                        onChange={(e)=>{setPass2(e.currentTarget.value)}}
                        value={password2}
                  />
            </div>
            <input type="submit" value='Register'/>
      </form>
    </div>
  )
}

export default signup