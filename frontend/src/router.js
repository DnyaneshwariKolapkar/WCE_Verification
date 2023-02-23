import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DocUploader from './components/form/docUploader'
import Insrtuctions from './components/form/Insrtuctions'
import Paymentform from './components/form/paymentform'

const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<DocUploader />} />
                {/* <Route path='/instructions' element={<Insrtuctions />} />
                <Route path='/payment' element={<Paymentform />} /> */}
            </Routes>
        </>
    )
}

export default Router
