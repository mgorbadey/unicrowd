import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Error from '../../pages/Error/Error'
import MasterCalendar from '../../pages/MasterCalendar'
import Results from '../../pages/Results/Results'
import Search from '../../pages/Search/Search'
import Header from '../Header/Header'
import LoginForm from '../LoginForm/LoginForm'
import Main from '../Main/Main'
import MasterProfile from '../MasterProfile/MasterProfile'
import ClientProfile from '../ClientProfile/ClientProfile'
import RegistrationForm from '../RegistrationForm/RegistrationForm'

const Layout = () => {
  return (
    <div
      className='min-h-full flex flex-col'
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className='backdrop-blur-2xl flex-grow flex flex-col'>
        <Header />
        <Main>
          <Routes>
            <Route path='/search' element={<Search />} />
            <Route path='/results' element={<Results />} />
            <Route path='/masters/:id/schedules' element={<MasterCalendar />} />
            <Route path='/masters/:id/profile' element={<MasterProfile />} />
            <Route path='/client/:id/profile' element={<ClientProfile />} />
            <Route path='/auth/login' element={<LoginForm />} />
            <Route path='/auth/registration' element={<RegistrationForm />} />
            <Route
              path='/'
              element={<Navigate to='/search' replace={true} />}
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </Main>
      </div>
    </div>
  )
}

export default Layout
