import { React, useState } from 'react'
import '../../assets/style.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Images } from "../../context/images"


const ResetPassword = () => {
    const [password, setPass] = useState('');
    const id = useParams();


    const HandleSubmit = async () => {
        if (password.length > 0) {
            const res = await axios.post('http://localhost:5000/verification/changepassword',
                {
                    id: id.id,
                    link: id.token,
                    password: password
                });
            console.log(res);
            if (res.status === 200) {
                alert('Password Reset Successfully');
            }
            else if (res.status === 401) {
                alert('Link Expired');
            }
            else {
                alert('Error');
            }
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
                        Reset Password
                    </h2>
                    <div className='innerDiv'>
                        <label htmlFor='password'>Password*</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            placeholder=' Enter your password'
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <button type='submit' onClick={() => HandleSubmit()} className='submitbtn' style={{}}>
                        Submit
                    </button>
                    <p style={{ textAlign: 'center', marginBlockStart: '0rem' }}>Please enter your new password</p>
                </div>
            </div>
        </>

    );
}

export default ResetPassword