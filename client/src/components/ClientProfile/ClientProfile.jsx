import React from 'react'
import { useParams } from 'react-router-dom'
// import { useClipboard } from 'use-clipboard-copy'
import $api from '../../http/index'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  CalendarIcon,
  LocationMarkerIcon,
  UsersIcon,
} from '@heroicons/react/solid'

export default function MasterProfile() {
  const [img, setImg] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [info, setInfo] = useState({})
  const [open, setOpen] = useState(false)
  const [modalCity, setModalCity] = useState(false)
  const [city, setCity] = useState(null)
  const [select, setSelect] = useState(null)
  const [categoryInfo, setCategoryInfo] = useState(null)
  const [itemTitle, setItemTitle] = useState('')
  const [itemDuration, setItemDuration] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [textarea, setTextarea] = useState(null)
  const [render, setRender] = useState(true)
  const [cityName, setCityName] = useState(null)
  const [event, setEvent] = useState([])
  const [itemChange, setItemChange] = useState(false)
  const [itemId, setItemId] = useState(null)

  // const clipboard = useClipboard()
  const params = useParams()

  const sendFile = React.useCallback(async () => {
    try {
      const data = new FormData()
      data.append('avatar', img)
      data.append('id', params.id)

      const res = await $api.post('http://localhost:3500/api/upload', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setAvatar(res.data.path)
    } catch (error) {
      console.log(error.message)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  const modalTextUpdate = async (e) => {
    setOpen(false)

    try {
      await $api.post(
        `http://localhost:3500/clients/modalTextUpdate`,
        { id: params.id, textarea }
      )
      setRender((prev) => !prev)
    } catch (error) {
      console.log(error.message)
    }
  }

  const onChangeHandler = (e) => {
    const index = e.target.selectedIndex
    const el = e.target.childNodes[index]
    const option = el.getAttribute('id')

    city.data.city.forEach((el) => {
      if (el.id === option) {
        setCityName(el.name)
      }
    })

    setSelect(option)
  }

  const serviceItemChange = (id) => {
    setItemChange(true)
    setItemId(id)
  }

  const cityUpdate = async (e) => {
    setModalCity(false)

    try {
      await $api.post(`http://localhost:3500/clients/cityUpdate`, {
        id: params.id,
        city: select,
      })
      setRender((prev) => !prev)
    } catch (error) {
      console.log(error.message)
    }
  }

  const itemUpdate = async (e) => {
    setItemChange(false)
    const item = {
      masterId: params.id,
      categoryId: select,
      title: itemTitle,
      duration: itemDuration,
      price: itemPrice,
      createdAt: Date.now(),
      itemId,
    }

    try {
      await $api.post(
        `http://localhost:3500/clients/updateItem`,
        item
      )
    } catch (error) {
      console.log(error.message)
    }

    try {
      const events = await $api.get(
        `http://localhost:3500/clients/${params.id}/events`,
      )
      setEvent(events.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const itemDelete = async () => {
    setItemChange(false)

    const item = { itemId }

    try {
      await $api.post(
        `http://localhost:3500/clients/deleteItem`,
        item
      )
    } catch (error) {
      console.log(error.message)
    }

    try {
      const events = await $api.get(
        `http://localhost:3500/clients/${params.id}/events`,
      )
      setEvent(events.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getUserInfo = async (e) => {
    const userInfo = await $api.get(`http://localhost:3500/clients/${params.id}/profile`)
    const cityInfo = await $api.get(`http://localhost:3500/clients/cityInfo`)
    const categoryInfo = await $api.get(`http://localhost:3500/clients/categoryInfo`)
    const events = await $api.get(`http://localhost:3500/clients/${params.id}/events`)
    console.log(events)

    setEvent(events.data)
    setCity(cityInfo)
    setInfo(userInfo)
    setCityName(userInfo.data.city.name)
    setCategoryInfo(categoryInfo)
  }

  React.useEffect(() => {
    getUserInfo()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar, render])

  return (
    <>
      <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
        <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap'>
          <div className='ml-4 mt-4'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                {info?.data?.userPic ? (
                  <img
                    className='h-12 w-12 rounded-full'
                    src={`/${info?.data?.userPic}`}
                    alt=''
                  />
                ) : (
                  <img
                    className='h-12 w-12 rounded-full'
                    src='https://secure.gravatar.com/avatar/508388088d9632ab7c5717e619363ec3?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg'
                    alt=''
                  />
                )}
              </div>

              <div className='ml-4'>
                <h3 className='text-lg leading-6 font-medium text-gray-900'>
                  {info?.data?.username}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className='space-y-8 divide-y divide-gray-200'>
        <div className='space-y-8 divide-y divide-gray-200 sm:space-y-5'>
          <div>
            <div className='mt-6 sm:mt-5 space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-center sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='photo'
                  className='block text-sm font-medium text-gray-700'
                >
                  Фото
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2'>
                  <div className='flex items-center'>
                    <span className='h-12 w-12 rounded-full overflow-hidden bg-gray-100'>
                      {info?.data?.userPic ? (
                        <img
                          className='h-12 w-12 rounded-full'
                          src={`/${info?.data?.userPic}`}
                          alt=''
                        />
                      ) : (
                        <img
                          className='h-12 w-12 rounded-full'
                          src='https://secure.gravatar.com/avatar/508388088d9632ab7c5717e619363ec3?s=96&d=https%3A%2F%2Fstatic.teamtreehouse.com%2Fassets%2Fcontent%2Fdefault_avatar-ea7cf6abde4eec089a4e03cc925d0e893e428b2b6971b12405a9b118c837eaa2.png&r=pg'
                          alt=''
                        />
                      )}{' '}
                    </span>
                    <input
                      type='file'
                      className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                    <button
                      type='button'
                      className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={sendFile}
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='pt-8 space-y-6 sm:pt-10 sm:space-y-5'>
            <div>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                Персональная информация
              </h3>
            </div>
            <div className='space-y-6 sm:space-y-5'>
              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Имя и Фамилия
                </label>
                <div className='mt-1 sm:mt-0 sm:col-span-2 '>
                  <input
                    type='text'
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    disabled
                    className='max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                    defaultValue={info?.data?.username}
                  />
                </div>
              </div>

              <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                <label
                  htmlFor='country'
                  className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                >
                  Город
                </label>
                {info?.data?.city?.name ? (
                  <div className='mt-1 sm:mt-0 sm:col-span-2 flex items-center'>
                    <input
                      id='email'
                      name='email'
                      type='email'
                      disabled
                      autoComplete='email'
                      value={cityName}
                      className='block max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                    />
                    <button
                      type='button'
                      className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      onClick={() => setModalCity(true)}
                    >
                      Изменить
                    </button>
                  </div>
                ) : (
                  <div className='mt-1 sm:mt-0 sm:col-span-2'>
                    <select
                      id='country'
                      name='country'
                      autoComplete='country-name'
                      onChange={(e) => setCity(e.target.value)}
                      className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                    >
                      <option>Москва</option>
                      <option>Санкт-Петербург</option>
                      <option>Казань</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
        <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
          <div className='ml-4 mt-2'>
            <h3 className='text-lg leading-6 font-medium text-gray-900'>
              Мои записи
            </h3>
          </div>
        </div>
      </div>

      <div className='bg-white shadow overflow-hidden sm:rounded-md'>
        <ul className='divide-y divide-gray-200'>
          {event &&
            event.map((position) => (
              <li key={position.id}>
                <div
                  onClick={() => serviceItemChange(position.id)}
                  className='block hover:bg-gray-50'
                >
                  <div className='px-4 py-4 sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <p className='text-sm font-medium text-indigo-600 truncate'>
                        {position.title}
                      </p>
                      <div className='ml-2 flex-shrink-0 flex'>
                        <p className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
                          {/* {position.price}₽ */}
                        </p>
                      </div>
                    </div>
                    <div className='mt-2 mt-style sm:flex sm:justify-between'>
                      <div className='sm:flex'>
                        <p className='flex items-center text-sm text-gray-500'>
                          <UsersIcon
                            className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          {/* {position.title} */}
                        </p>
                        <p className='mt-2 mt-style flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                          <LocationMarkerIcon
                            className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          {/* Продолжительность: {position.duration} минут */}
                        </p>
                      </div>
                      <div className='mt-2 mt-style flex items-center text-sm text-gray-500 sm:mt-0'>
                        <CalendarIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        {/* <p>Создано {position.createdAt.slice(0, 10)}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* Модалка для изменения информации о себе */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
                  <div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        О себе
                      </Dialog.Title>
                      <div className='mt-2 mt-style'>
                        <textarea
                          id='about'
                          name='about'
                          rows={3}
                          onChange={(e) => setTextarea(e.target.value)}
                          className='max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md'
                          defaultValue={''}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                      onClick={modalTextUpdate}
                    >
                      Изменить
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Модалка для изменения города */}
      <Transition.Root show={modalCity} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setModalCity}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
                  <div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Выберите свой город
                      </Dialog.Title>
                      <div className='mt-2 mt-style'>
                        <select
                          name='country'
                          autoComplete='country-name'
                          onChange={onChangeHandler}
                          defaultValue={cityName}
                          className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                        >
                          {city?.data?.city.map((el) => (
                            <option key={el.id} id={el.id} value={el.name}>
                              {el.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                      onClick={cityUpdate}
                    >
                      Сохранить
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Модалка для изменения удаления айтема */}
      <Transition.Root show={itemChange} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setItemChange}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          <div className='fixed z-10 inset-0 overflow-y-auto'>
            <div className='flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                enterTo='opacity-100 translate-y-0 sm:scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              >
                <Dialog.Panel className='relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6'>
                  <div>
                    <div className='mt-3 text-center sm:mt-5'>
                      <Dialog.Title
                        as='h3'
                        className='text-lg leading-6 font-medium text-gray-900'
                      >
                        Измените свою услугу
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className='mt-2 mt-style'>
                    <label
                      htmlFor='title'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Название услуги
                    </label>
                    <div className='mt-1'>
                      <input
                        type='email'
                        name='email'
                        id='title'
                        className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                        placeholder='Массаж простаты'
                        onChange={(e) => setItemTitle(e.target.value)}
                      />
                    </div>
                    <div className='mt-1'>
                      <label
                        htmlFor='location'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Категория услуги
                      </label>
                      <select
                        id='location'
                        name='location'
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                        defaultValue='Canada'
                        onChange={onChangeHandler}
                      >
                        {categoryInfo?.data?.category.map((item) => (
                          <option key={item.id} id={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className='mt-1'>
                      <label
                        htmlFor='location'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Продолжительность услуги в минутах
                      </label>
                      <select
                        id='location'
                        name='location'
                        className='mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md'
                        defaultValue='Canada'
                        onChange={(e) => setItemDuration(e.target.value)}
                      >
                        <option>30</option>
                        <option>60</option>
                        <option>90</option>
                        <option>120</option>
                      </select>
                    </div>

                    <div className='mt-1'>
                      <label
                        htmlFor='price'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Цена услуги
                      </label>
                      <div className='mt-1 relative rounded-md shadow-sm'>
                        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                          <span className='text-gray-500 sm:text-sm'>₽</span>
                        </div>
                        <input
                          type='text'
                          name='price'
                          id='price'
                          className='focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md'
                          placeholder='0.00'
                          aria-describedby='price-currency'
                          onChange={(e) => setItemPrice(e.target.value)}
                        />
                        <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none'>
                          <span
                            className='text-gray-500 sm:text-sm'
                            id='price-currency'
                          >
                            RUB
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6'>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                      onClick={itemUpdate}
                    >
                      Сохранить
                    </button>
                    <div></div>
                    <button
                      type='button'
                      className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                      onClick={itemDelete}
                    >
                      Удалить услугу
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
