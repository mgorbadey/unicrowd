import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MasterCalendar from '../../pages/MasterCalendar'
import Header from '../Header/Header'
import LoginForm from '../LoginForm/LoginForm'
import Main from '../Main/Main'
import MasterProfile from '../MasterProfile/MasterProfile'
import RegistrationForm from '../RegistrationForm/RegistrationForm'

const Layout = () => {
  return (
    <>
      <div className='min-h-full'>
        <Header />
        <Main>
          <Routes>
            {/* <Route path='/' element={<Navigate to={} replace={true} />} /> */}
            <Route path='/masters/:id/schedules' element={<MasterCalendar />} />
            <Route path='/masters/:id/profile' element={<MasterProfile />} />
            <Route path='/auth/login' element={<LoginForm />} />
            <Route path='/auth/registration' element={<RegistrationForm />} />
          </Routes>
        </Main>
      </div>
    </>
  )
}

export default Layout
