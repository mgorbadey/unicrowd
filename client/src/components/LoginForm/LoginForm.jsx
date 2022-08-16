import { Button, Input } from '@chakra-ui/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import $api from '../../http/index'

export default function Example() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = (e) => {
    e.preventDefault()
    $api
      .post('http://localhost:3500/auth/login', {
        email,
        password,
      })
      .then(function (response) {
        window.localStorage.setItem('accessToken', response.data.accessToken)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div
          className='max-w-md w-full space-y-8'
          style={{
            backgroundColor: 'rgb(255, 255, 255, 0.5)',
            padding: '20px',
            borderRadius: '8px',
          }}
        >
          <div className='flex justify-center'>
            <h1
              className='mt-2 text-4xl font-bold tracking-tight sm:text-5xl sm:tracking-tight'
              style={{ fontSize: '2rem', color: 'rgb(108, 114, 127)' }}
            >
              Войдите в свой аккаунт
            </h1>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <Input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  bg='white'
                  mb='10px'
                  color='rgb(108, 114, 127)'
                  border='2px solid white'
                  focusBorderColor='rgb(140, 175, 174)'
                  size='md'
                  placeholder='почта'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  bg='white'
                  color='rgb(108, 114, 127)'
                  border='2px solid white'
                  focusBorderColor='rgb(140, 175, 174)'
                  size='md'
                  placeholder='пароль'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className='flex justify-center'>
              <Button
                type='submit'
                color='rgb(108, 114, 127)'
                cursor='pointer'
                bg='white'
                w='100px'
                size='md'
                onClick={(e) => {
                  login(e)
                  navigate('/search', { replace: true })
                }}
              >
                Войти
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
