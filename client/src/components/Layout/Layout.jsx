import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '../Header/Header'
import Main from '../Main/Main'

const Layout = () => {
  return (
    <>
      <div className='min-h-full'>
        <Header />
        <Main>
          <Routes>
            {/* <Route path='/' element={<Navigate to={} replace={true} />} /> */}
          </Routes>
        </Main>
      </div>
    </>
  )
}

export default Layout
