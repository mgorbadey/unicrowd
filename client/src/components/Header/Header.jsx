import React, { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import headerLogo from './headerLogo.png'
import { Button } from '@chakra-ui/react'
import $api from '../../http/index'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderAuth } from '../../redux/actions/localeStorageAction'

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState({})
  const render = useSelector((store) => store.localStorage)

  const logout = () => {
    navigate('/search', { replace: false })
    $api
      .post('http://localhost:3500/auth/logout', {})
      .then(function () {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('user')
        dispatch(renderAuth())
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const getProfile = () => {
    if (authUser?.role === 'master')
      navigate(`/masters/${authUser.id}/profile`, { replace: false })
    if (authUser?.role === 'client')
      navigate(`/clients/${authUser.id}/profile`, { replace: false })
  }

  const getSchedule = () => {
    if (authUser?.role === 'master')
      navigate(`/masters/${authUser.id}/schedules`, { replace: false })
  }

  const userNavigation =
    authUser?.role === 'master'
      ? [
          { name: 'Профиль', func: getProfile },
          { name: 'Расписание', func: getSchedule },
          { name: 'Выход', func: logout },
        ]
      : [
          { name: 'Профиль', func: getProfile },
          { name: 'Выход', func: logout },
        ]

  useEffect(() => {
    setAuthUser(JSON.parse(window.localStorage.getItem('user')))
  }, [render])

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
                  onClick={() => navigate('/search', { replace: false })}
                />
              </div>
              <Button
                color='rgb(136, 161, 160)'
                cursor='pointer'
                bg='transparent'
                size='sm'
                ml='10px'
                _hover='none'
                _active='none'
                onClick={() => {
                  navigate('/results', { replace: false })
                }}
              >
                Поиск
              </Button>
            </div>
            {authUser ? (
              <div className='hidden md:block'>
                <div className='ml-4 flex items-center md:ml-6'>
                  {/* Profile dropdown */}
                  <Menu as='div' className='ml-3 relative'>
                    <div>
                      <Menu.Button className='max-w-xs rounded-full flex items-center text-sm'>
                        <span className='sr-only'>Open user menu</span>
                        {authUser?.userPic ? (
                          <img
                            className='h-8 w-8 rounded-full'
                            src={`/${authUser.userPic}`}
                            alt='user'
                          />
                        ) : (
                          <img
                            className='h-12 w-12 rounded-full'
                            src='https://secure.gravatar.com/avatar/508388088d9632ab7c5717e619363ec3?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg'
                            alt=''
                          />
                        )}
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
                              <div
                                className='block px-4 py-2 text-sm text-gray-700 cursor-pointer'
                                onClick={item.func}
                              >
                                {item.name}
                              </div>
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
                    navigate('/auth/registration', { replace: false })
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
                    navigate('/auth/login', { replace: false })
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
