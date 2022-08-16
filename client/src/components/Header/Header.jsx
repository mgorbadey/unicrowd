import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import headerLogo from './headerLogo.png'
import { Button } from '@chakra-ui/react'
import $api from '../../http/index'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const logout = () => {
  $api
    .post('http://localhost:3500/auth/logout', {})
    .then(function () {
      window.localStorage.removeItem('accessToken')
      window.localStorage.removeItem('user')
    })
    .catch(function (error) {
      console.log(error)
    })
}

const userNavigation = [
  { name: 'Профиль', href: '#' },
  { name: 'Расписание', href: '#' },
  { name: 'Выход', href: '#', func: logout },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const navigate = useNavigate()

  const authUser = window.localStorage.getItem('user')

  return (
    <Disclosure as='nav' className='bg-white'>
      {({ open }) => (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <img
                  className='h-10 w-10 rounded-full cursor-pointer'
                  src={headerLogo}
                  alt='logo'
                  onClick={() => navigate('/search', { replace: true })}
                />
              </div>
            </div>
            {authUser ? (
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='max-w-xs rounded-full flex items-center text-sm'>
                        <span className='sr-only'>Open user menu</span>
                        <img
                          className='h-8 w-8 rounded-full'
                          src={user.imageUrl}
                          alt='user'
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-100'
                      enterFrom='transform opacity-0 scale-95'
                      enterTo='transform opacity-100 scale-100'
                      leave='transition ease-in duration-75'
                      leaveFrom='transform opacity-100 scale-100'
                      leaveTo='transform opacity-0 scale-95'
                    >
                      <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? '' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                                onClick={item.func}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            ) : (
              <div>
                <Button
                  color='rgb(168, 163, 157)'
                  cursor='pointer'
                  bg='transparent'
                  size='sm'
                  _hover='none'
                  _active='none'
                  onClick={() => {
                    navigate('/auth/registration', { replace: true })
                  }}
                >
                  Регистрация
                </Button>
                <Button
                  color='rgb(136, 161, 160)'
                  cursor='pointer'
                  bg='transparent'
                  size='sm'
                  ml='10px'
                  _hover='none'
                  _active='none'
                  onClick={() => {
                    navigate('/auth/login', { replace: true })
                  }}
                >
                  Вход
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </Disclosure>
  )
}

export default Header
