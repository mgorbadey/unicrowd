import { Button } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Error = () => {
  const navigate = useNavigate()
  return (
    <main
      className='min-h-full bg-cover bg-top fixed top-0 right-0 bottom-0 left-0'
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75")',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div className='fixed top-0 right-0 bottom-0 left-0 backdrop-blur-2xl flex justify-center items-center'>
        <div
          className='max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:pb-48'
          style={{
            backgroundColor: 'rgb(255, 255, 255, 0.5)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <p
            className='text-base font-semibold'
            style={{ color: 'rgb(124, 156, 154)' }}
          >
            404
          </p>
          <h1
            className='mt-2 text-4xl font-bold text-white tracking-tight sm:text-5xl sm:tracking-tight'
            style={{ color: 'rgb(98, 97, 95)' }}
          >
            Похоже, что вы потерялись
          </h1>
          <p
            className='mt-2 text-lg font-medium'
            style={{ color: 'rgb(98, 97, 95)' }}
          >
            Страница, которую вы ищете, не существует
          </p>
          <div className='mt-6 cursor-default'>
            <Button
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              size='lg'
              onClick={() => navigate('/search', { replace: true })}
            >
              Вернуться на главную
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Error
