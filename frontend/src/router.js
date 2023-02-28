import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DocUploader from './components/form/docUploader'
import Insrtuctions from './components/form/Insrtuctions'
import Paymentform from './components/form/paymentform'
import Login from './components/form/Login'

const Router = () => {
    return (
        <>
            <Routes>
                {/* <Route path="/" element={<DocUploader />} /> */}
                <Route path='/' element={<Insrtuctions />} />
                <Route path='/DocUploader' element={<DocUploader />} />
                <Route path='/payment' element={<Paymentform />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </>
    )
}

export default Router
