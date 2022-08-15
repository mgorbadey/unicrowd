import React from 'react'

const Main = ({ children }) => {
  return (
    <main className='flex-grow'>
      <div className='max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full'>
        <div className='px-4 py-6 sm:px-0 min-h-full'>
          <div
            className='border-2 border-white rounded-lg'
            style={{ height: '41rem' }}
          >
            {children}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Main
