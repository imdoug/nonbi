import React, { useRef, useState, useContext } from "react"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"


const ForgotPassword = () => {
      const { resetPassword } = useContext(AuthContext)
      const [error, setError] = useState('')
      const [loading, setLoading] = useState('')
      const [message, setMessage] = useState('')
      const emailRef = useRef()

      const handleSubmit = async (e) =>{
            e.preventDefault()
            try {
                  setMessage('')
                  setLoading(true)
                  await resetPassword(emailRef.current.value)
                  setError('')
                  setMessage('Check your inbox for futher instructions')
            } catch (error) {
                  setError('Failed to reset password')
            }
            setLoading(false)
      }
  return (
    <>
      <Card>
            <Card.Body>
                  <h2 className="text-center mb-4">Reset Password</h2>
                  {error && <Alert variant="danger">{error}</Alert>}
                  {message && <Alert variant="success">{message}</Alert>}

                  <Form>
                        <Form.Group id="email">
                              <Form.Label>Email</Form.Label>
                              <Form.Control type="email" ref={emailRef}  required />
                        </Form.Group>
                        <Button type="submit" disabled={loading} className="w-100 mt-2" onClick={(e)=>{handleSubmit(e)}}>Reset password</Button>
                  </Form>
                  <div className="w-100 text-center mt-3">
                        <Link to="/signin" >Login</Link>
                  </div>
            </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup" >Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;