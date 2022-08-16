import { Input, Button, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import $api from '../../http/index'
import { getAuthRender } from '../../redux/actions/localeStorageAction'

export default function Example() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selected, setSelected] = useState('')

  const registration = (e) => {
    e.preventDefault()
    $api
      .post('http://localhost:3500/auth/registration', {
        username,
        email,
        password,
        role: selected,
      })
      .then(function (response) {
        window.localStorage.setItem('accessToken', response.data.accessToken)
        window.localStorage.setItem('user', JSON.stringify(response.data.user))
        dispatch(getAuthRender())
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
              Создайте свой аккаунт
            </h1>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='rounded-md shadow-sm -space-y-px'>
              <div>
                <Input
                  id='username'
                  name='username'
                  type='username'
                  autoComplete='username'
                  required
                  bg='white'
                  mb='10px'
                  color='rgb(108, 114, 127)'
                  border='2px solid white'
                  focusBorderColor='rgb(140, 175, 174)'
                  size='md'
                  placeholder='полное имя'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              <div>
                <Select
                  mt='24px'
                  placeholder='Вы клиент или специалист'
                  size='md'
                  color='rgb(108, 114, 127)'
                  border='2px solid white'
                  focusBorderColor='rgb(140, 175, 174)'
                  bg='white'
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value='client'>Клиент</option>
                  <option value='master'>Специалист</option>
                </Select>
              </div>
            </div>

            <div className='flex justify-center'>
              <Button
                type='submit'
                color='rgb(108, 114, 127)'
                cursor='pointer'
                bg='white'
                w='200px'
                size='md'
                onClick={(e) => {
                  registration(e)
                  navigate('/search', { replace: true })
                }}
              >
                Зарегистрироваться
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
