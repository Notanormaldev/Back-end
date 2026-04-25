import React from 'react'
import { Link } from 'react-router-dom'
import Formgroup from '../Components/Formgroup'
import '../styles/login.scss'
function Login() {
  return (
    <main className="loginpage">
        <div className="form-container">
            <h1>Login</h1>
            <form>
               <Formgroup  label='Email' placeholder='Enter the Email'/>
               <Formgroup label="password" placeholder='Enter the password'/>
                <button >Login</button>
            </form>
            <p>Don't have account ? <Link to='/register'>Register here</Link></p>
        </div>
    </main>
  )
}

export default Login
