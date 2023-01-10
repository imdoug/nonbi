import React, {useState, useContext, useRef} from 'react'
import { AuthContext } from '../src/service/AuthContext';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';



const Home = () => {
      const router = useRouter()
      const { signIn, userData } = useContext(AuthContext)
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)
      const emailRef = useRef()
      const passwordRef = useRef()

      const handleSignIn = async (e) =>{
            e.preventDefault()
            try {
                  setLoading(true)
                  await signIn(emailRef.current.value, passwordRef.current.value)
                  console.log(userData)
                  localStorage.setItem("user", JSON.stringify(userData))
                  Cookies.set("loggedIn", true)
                  router.push('/dashboard')
            } catch (error) {
                  setError('Failed to sign in ')
            }
            setLoading(false)
      }
return (
      <div>
      <form id='signup-form' className='signup' onSubmit={(e) => handleSignIn(e)}>
            <div>
            <label htmlFor='email'>Email Address</label>
            <input 

                  type="email"
                  name='email'
                  id='email'
                  required
                  minLength="10"
                  maxLength="50"
                  ref={emailRef}
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
                  ref={passwordRef}
            />
            </div>
            <input type="submit" value='Login'/>
      </form>
      </div>
)
}

export default Home


