import React from 'react'
import '../../assets/style.css'

const Login = () => {
    return (
        <>
        <div className='Header'>
            <img 
                src =""
                alt = ''
                className='image'
            />
            <h1>Walchand College of Engineering</h1>
        </div>

        <div className='login-form'>
        <h2>Welcome to Verification Portal</h2>
        <div className='form'>
          <h2 style={{ textAlign: 'center', marginBlockStart: '0rem' }}>
            Sign in
          </h2>
          <div className='innerDiv'>
            <label htmlFor='username'>Username*</label>
            <input
              type='text'
              id='username'
              placeholder=' Enter your username'
              name='username'
            />
          </div>
          <div className='innerDiv'>
            <label htmlFor='password'>Password*</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder=' Enter your password' 
            />
          </div>
          <button type='submit' className='submitbtn'>
            Login
          </button>
        </div>
      </div>
        </>

    );
}

export default Login