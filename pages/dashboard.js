import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../src/service/AuthContext';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import NavBar from '../components/Global/NavBar';


const Dashboard = () => {

const router = useRouter()
const { logout, userData, users, getData } = useContext(AuthContext)

  const handleLogout = async () =>{
    try {
      await logout()
      Cookies.remove("loggedIn")
      localStorage.clear()
      router.push('/')
    } catch (error) {
      setError('Failed to log out')
    }
  }
  useEffect(()=>{
    const data = JSON.parse(window.localStorage.getItem('user'))
    getData(data.id)
  },[])
  return (
      <>
      <NavBar/>
      <h1>{userData?.uid}</h1>
      <h2>{userData?.name}</h2>
      <h3>{userData?.email}</h3>
      <img width={300} src={userData?.profileImg}/>

      <div>dashboard for logged users</div>
      <button type="button" onClick={handleLogout}>logout</button>
    </>
  )
}
export default Dashboard
