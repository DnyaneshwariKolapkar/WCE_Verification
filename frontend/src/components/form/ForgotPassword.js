import React from 'react'
import '../../assets/style.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Images } from "../../context/images"

const ForgotPassword = () => {

    const [email, setEmail] = React.useState('');
    const navigate = useNavigate();

    const submitButton = async() => {
        try {
            if (email) {
                const user = {
                    email: email
                }
                const res = await axios.post('http://localhost:5000/verification/resetpassword', user);
                console.log(res.data);
                if (res.status === 200) {
                    alert("Password reset link sent to your email");
                    // navigate('/login');
                }
                else {
                    console.log(res);
                }
            }
            else {
                alert("Please enter all fields");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='Header'>
                <img
                    src={Images.logoImage}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type='submit' className='submitbtn' onClick={submitButton}>
                        Continue
                    </button>
                    <p style={{ textAlign: 'center', marginBlockStart: '0rem' }}>Please enter your registered E-mail</p>
                </div>
            </div>
        </>

    );
}

export default ForgotPassword