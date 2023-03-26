import React from 'react'
import '../../assets/style.css'
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

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
                {/* <h2>Welcome to Verification Portal</h2> */}
                <br />
                <br />
                <div className='form'>
                    <h2 style={{ marginBlockStart: '0rem' }}>
                        Recover Account
                    </h2>
                    <div className='innerDiv'>
                        <label htmlFor='username'>E-mail*</label>
                        <input
                            type='text'
                            id='username'
                            placeholder=' Enter your e-mail'
                            name='username'
                        />
                    </div>
                    {/* <div className='innerDiv'>
            <label htmlFor='password'>Password*</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder=' Enter your password' 
            />
          </div> */}
                    <button type='submit' className='submitbtn' style={{}}>
                        Continue
                    </button>
                    <p style={{ textAlign: 'center', marginBlockStart: '0rem' }}>Please enter your registered E-mail</p>
                </div>
            </div>
        </>

    );
}

export default ForgotPassword