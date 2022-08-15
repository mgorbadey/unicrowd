import React, { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import headerLogo from './headerLogo.png'

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}

const userNavigation = [
  { name: 'Профиль', href: '#' },
  { name: 'Расписание', href: '#' },
  { name: 'Выйти', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Header = () => {
  const navigate = useNavigate()
  return (
    <Disclosure as='nav' className='bg-white'>
      {({ open }) => (
        <>
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
              <div className='-mr-2 flex md:hidden'>
                {/* Mobile menu button */}
                <Disclosure.Button className='inline-flex items-center justify-center p-2'>
                  <span className='sr-only'>Open main menu</span>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-10 w-10 rounded-full'
                      src={user.imageUrl}
                      alt=''
                    />
                  </div>
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className='md:hidden'>
            <div className='pt-3 pb-3 border-t border-gray-700'>
              <div className='px-2 space-y-1'>
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className='block px-3 py-1 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700'
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export default Header
