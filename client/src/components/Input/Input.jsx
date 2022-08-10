import React from 'react'

const Input = () => {
  return (
    <div className='mt-1'>
      <input
        type='text'
        name='name'
        id='name'
        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full'
        placeholder='Search'
      />
    </div>
  )
}

export default Input
