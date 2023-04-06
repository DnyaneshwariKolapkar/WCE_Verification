import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DocUploader from './components/form/docUploader'
import Insrtuctions from './components/form/Insrtuctions'
import Paymentform from './components/form/paymentform'
import Login from './components/form/Login'
import Sidebar from './components/form/Sidebar'
import Allreq from './pages/Allreq'
import Analytics from './pages/Analytics'
import Pendingreq from './pages/pendingreq'
import Transactions from './pages/Transactions'
import ManageUser from './pages/ManageUser'
import ForgotPassword from './components/form/ForgotPassword'
import ResetPassword from './components/form/ResetPassword'
import Pendingstudents from './pages/pendingstudents'
import DocView from './pages/DocView'

const Router = () => {
    return (
        <>

            <Routes>
                <Route path="/client" element={<Insrtuctions />} />
                <Route path='/DocUploader' element={<DocUploader />} />
                <Route path='/payment' element={<Paymentform />} />
                <Route path='/login' element={<Login />} />
                <Route path='/forgotpassword' element={<ForgotPassword />} />
                <Route path='/resetpassword/:id/:token' element={<ResetPassword />} />
                <Route path='/sidebar' element={<Sidebar />} >

                    <Route path="" element={<Pendingreq />} />
                    <Route path="pendingstudents" element={<Pendingstudents />} />
                    <Route path="pendingreq" element={<Pendingreq />} />
                    <Route path="pendingreq/pendingstudents" element={<Pendingstudents />} />
                    <Route path="pendingreq/pendingstudents/view" element={<DocView />} />
                    <Route path="pendingstudents/view" element={<DocView />} />

                    <Route path="allreq" element={<Allreq />} />
                    <Route path="allreq/pendingstudents" element={<Pendingstudents />} />
                    <Route path="allreq/pendingstudents/view" element={<DocView />} />

                    <Route path="transactions" element={<Transactions />} />

                    <Route path="analytics" element={<Analytics />} />

                    <Route path="manageuser" element={<ManageUser />} />

                </Route>
                <Route path="*" element= {<Insrtuctions /> } />
            </Routes>
        </>
    )
}

export default Router
