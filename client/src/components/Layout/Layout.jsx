import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MasterCalendar from '../../pages/MasterCalendar'
import Header from '../Header/Header'
import Main from '../Main/Main'
import MasterProfile from '../MasterProfile/MasterProfile'

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
          </Routes>
        </Main>
      </div>
    </>
  )
}

export default Layout
