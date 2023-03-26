import React from 'react'
import '../../assets/style.css'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  return (
    <>
      <div className='Header'>
        <img
          src="https://cdn.discordapp.com/attachments/814496393619832852/1089115898662629436/FinIQ_2.png"
          alt=''
          className='image'
        />
        <h2>Walchand College of Engineering</h2>
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
          <button type='submit' className='submitbtn' onClick={() => navigate('/sidebar')}>
            Login
          </button>
          <a
            href=''
            style={{ color: 'blue', textDecoration: 'none' }}
            onClick={() => {
              navigate('/forgotpassword')
            }}
          // className={login.continueasguest}
          >
            Forgot Password
          </a>
        </div>
      </div>
    </>

  );
}

export default Login