import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy'
import $api from '../../http/index'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { getPicture } from '../../redux/actions/pictureAction'

export default function MasterProfile() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [authUser, setAuthUser] = useState({})

  useEffect(() => {
    setAuthUser(JSON.parse(window.localStorage.getItem('user')))
  }, [])

  const [img, setImg] = useState(null)
  const [avatar, setAvatar] = useState(null)
  const [info, setInfo] = useState({})
  const [open, setOpen] = useState(false)
  const [modalItem, setModalItem] = useState(false)
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
  const [service, setService] = useState([])
  const [itemChange, setItemChange] = useState(false)
  const [itemId, setItemId] = useState(null)

  const clipboard = useClipboard()
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
      dispatch(getPicture())
    } catch (error) {
      console.log(error.message)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [img])

  const modalTextUpdate = async (e) => {
    setOpen(false)

    try {
      await $api.post(`http://localhost:3500/masters/modalTextUpdate`, {
        id: params.id,
        textarea,
      })
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
      await $api.post(`http://localhost:3500/masters/cityUpdate`, {
        id: params.id,
        city: select,
      })
      setRender((prev) => !prev)
    } catch (error) {
      console.log(error.message)
    }
  }

  const itemCreate = async (e) => {
    setModalItem(false)

    const item = {
      masterId: params.id,
      categoryId: select,
      title: itemTitle,
      duration: itemDuration,
      price: itemPrice,
      createdAt: Date.now(),
    }

    try {
      await $api.post(`http://localhost:3500/masters/createItem`, item)
    } catch (error) {
      console.log(error.message)
    }

    try {
      const serviceItemInfo = await $api.get(
        `http://localhost:3500/masters/${params.id}/serviceItemInfo`
      )
      setService(serviceItemInfo.data.serviceItem)
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
      await $api.post(`http://localhost:3500/masters/updateItem`, item)
    } catch (error) {
      console.log(error.message)
    }

    try {
      const serviceItemInfo = await $api.get(
        `http://localhost:3500/masters/${params.id}/serviceItemInfo`
      )
      setService(serviceItemInfo.data.serviceItem)
    } catch (error) {
      console.log(error.message)
    }
  }

  const itemDelete = async () => {
    setItemChange(false)

    const item = { itemId }

    try {
      await $api.post(`http://localhost:3500/masters/deleteItem`, item)
    } catch (error) {
      console.log(error.message)
    }

    try {
      const serviceItemInfo = await $api.get(
        `http://localhost:3500/masters/${params.id}/serviceItemInfo`
      )
      setService(serviceItemInfo.data.serviceItem)
    } catch (error) {
      console.log(error.message)
    }
  }

  const getUserInfo = async (e) => {
    const userInfo = await $api.get(
      `http://localhost:3500/masters/${params.id}/profile`
    )
    const cityInfo = await $api.get(`http://localhost:3500/masters/cityInfo`)
    const categoryInfo = await $api.get(
      `http://localhost:3500/masters/categoryInfo`
    )
    const serviceItemInfo = await $api.get(
      `http://localhost:3500/masters/${params.id}/serviceItemInfo`
    )

    // console.log(serviceItemInfo, 'serviceItemInfo')
    // console.log(categoryInfo, 'categoryInfo')

    setService(serviceItemInfo.data.serviceItem)
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
      <Grid
        h='100%'
        templateRows='repeat(1, 1fr)'
        templateColumns='repeat(6, 1fr)'
        gap={4}
        p='10px'
      >
        <GridItem
          rowSpan={1}
          colSpan={4}
          bg='rgb(255, 255, 255, 0.5)'
          borderRadius='8px'
        >
          <Flex direction='column' justify='space-between' h='100%'>
            {/* name */}
            <div className=' px-4 py-8 sm:px-6'>
              <div className='flex justify-between items-center flex-wrap sm:flex-nowrap'>
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
                  <div className='ml-6'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900'
                      style={{ fontSize: '2rem', color: 'rgb(98, 97, 95)' }}
                    >
                      {info?.data?.username}
                    </h3>
                  </div>
                </div>
                <div className='flex items-center'>
                  {authUser?.role === 'master' ? (
                    authUser?.id === Number(params.id) && (
                      <Button
                        type='button'
                        color='rgb(108, 114, 127)'
                        cursor='pointer'
                        bg='white'
                        w='150px'
                        size='md'
                        onClick={() => setModalItem(true)}
                      >
                        Создать услугу
                      </Button>
                    )
                  ) : (
                    <Button
                      type='button'
                      color='rgb(108, 114, 127)'
                      cursor='pointer'
                      bg='white'
                      w='150px'
                      size='md'
                      onClick={() =>
                        authUser?.id
                          ? navigate(`/masters/${params.id}/schedules`, {
                              replace: false,
                            })
                          : onOpen()
                      }
                    >
                      Записаться
                    </Button>
                  )}
                </div>
              </div>
            </div>
            {/* form */}
            <Box bg='rgb(255, 255, 255, 0.5)' borderRadius='8px'>
              <form>
                <Grid
                  h='100%'
                  templateRows='repeat(7, 1fr)'
                  templateColumns='repeat(24, 1fr)'
                  gap={2}
                  p='10px'
                >
                  {/* ФОТО */}
                  {authUser?.id === Number(params.id) && (
                    <>
                      <GridItem rowSpan={1} colSpan={4} borderRadius='8px'>
                        <Flex minH='100%' justify='center' align='center'>
                          <label
                            htmlFor='photo'
                            className='block text-sm font-medium text-gray-700'
                            style={{
                              fontSize: '1.2rem',
                              color: 'rgb(98, 97, 95)',
                            }}
                          >
                            Фото
                          </label>
                        </Flex>
                      </GridItem>
                      <GridItem rowSpan={1} colSpan={15} borderRadius='8px'>
                        <div className='flex min-h-full items-center justify-center p-3'>
                          <Input
                            pt='3px'
                            borderRadius='8px'
                            cursor='pointer'
                            type='file'
                            bg='white'
                            color='rgb(108, 114, 127)'
                            border='2px solid white'
                            focusBorderColor='rgb(140, 175, 174)'
                            _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                            _active={{ borderColor: 'rgb(140, 175, 174)' }}
                            size='md'
                            onChange={(e) => setImg(e.target.files[0])}
                          />
                        </div>
                      </GridItem>
                      <GridItem rowSpan={1} colSpan={5} borderRadius='8px'>
                        <Flex minH='100%' justify='center' align='center'>
                          <Button
                            type='button'
                            color='rgb(108, 114, 127)'
                            cursor='pointer'
                            bg='white'
                            w='100px'
                            size='sm'
                            onClick={sendFile}
                          >
                            Добавить
                          </Button>
                        </Flex>
                      </GridItem>
                    </>
                  )}
                  {/* О СЕБЕ */}
                  <GridItem rowSpan={2} colSpan={4} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      <label
                        htmlFor='about'
                        className='block text-sm font-medium text-gray-700'
                        style={{
                          fontSize: '1.2rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        О себе
                      </label>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={2} colSpan={15} borderRadius='8px'>
                    <div className='flex min-h-full items-center justify-center p-3'>
                      <Textarea
                        id='about'
                        name='about'
                        rows={4}
                        disabled
                        borderRadius='8px'
                        bg='white'
                        color='black'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                        _active={{ borderColor: 'rgb(140, 175, 174)' }}
                        size='md'
                        defaultValue={info?.data?.info}
                      />
                    </div>
                  </GridItem>
                  <GridItem rowSpan={2} colSpan={5} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      {authUser?.id === Number(params.id) && (
                        <Button
                          type='button'
                          color='rgb(108, 114, 127)'
                          cursor='pointer'
                          bg='white'
                          w='100px'
                          size='sm'
                          onClick={() => setOpen(true)}
                        >
                          Изменить
                        </Button>
                      )}
                    </Flex>
                  </GridItem>
                  {/* ПЕРС ИНФО */}
                  <GridItem rowSpan={1} colSpan={24} borderRadius='8px'>
                    <Flex minH='100%' ml='50px' align='center'>
                      <h3
                        className='text-lg leading-6 font-medium text-gray-900'
                        style={{
                          fontSize: '1.5rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        Персональная информация
                      </h3>
                    </Flex>
                  </GridItem>
                  {/* ИМЯ И ФАМИЛИЯ  */}
                  <GridItem rowSpan={1} colSpan={4} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                        style={{
                          fontSize: '1.2rem',
                          color: 'rgb(98, 97, 95)',
                          textAlign: 'center',
                        }}
                      >
                        Имя и Фамилия
                      </label>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={15} borderRadius='8px'>
                    <div className='flex min-h-full items-center justify-center p-3'>
                      <Input
                        name='first-name'
                        id='first-name'
                        type='text'
                        autoComplete='given-name'
                        disabled
                        bg='white'
                        color='black'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                        _active={{ borderColor: 'rgb(140, 175, 174)' }}
                        size='md'
                        defaultValue={info?.data?.username}
                      />
                    </div>
                  </GridItem>
                  <GridItem
                    rowSpan={1}
                    colSpan={5}
                    borderRadius='8px'
                  ></GridItem>
                  {/* ПОЧТА */}
                  <GridItem rowSpan={1} colSpan={4} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700'
                        style={{
                          fontSize: '1.2rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        Почта
                      </label>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={15} borderRadius='8px'>
                    <div className='flex min-h-full items-center justify-center p-3'>
                      <Input
                        name='email'
                        id='email'
                        type='email'
                        autoComplete='email'
                        disabled
                        bg='white'
                        color='black'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                        _active={{ borderColor: 'rgb(140, 175, 174)' }}
                        size='md'
                        defaultValue={info?.data?.email}
                        ref={clipboard.target}
                      />
                    </div>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={5} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      <Button
                        type='button'
                        color='rgb(108, 114, 127)'
                        cursor='pointer'
                        bg='white'
                        w='100px'
                        size='sm'
                        onClick={clipboard.copy}
                      >
                        Скопировать
                      </Button>
                    </Flex>
                  </GridItem>
                  {/* ГОРОД */}
                  <GridItem rowSpan={1} colSpan={4} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      <label
                        htmlFor='country'
                        className='block text-sm font-medium text-gray-700'
                        style={{
                          fontSize: '1.2rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        Город
                      </label>
                    </Flex>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={15} borderRadius='8px'>
                    <div className='flex min-h-full items-center justify-center p-3'>
                      <Input
                        name='email'
                        id='email'
                        type='email'
                        autoComplete='email'
                        disabled
                        bg='white'
                        color='black'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                        _active={{ borderColor: 'rgb(140, 175, 174)' }}
                        size='md'
                        value={cityName}
                      />
                    </div>
                  </GridItem>
                  <GridItem rowSpan={1} colSpan={5} borderRadius='8px'>
                    <Flex minH='100%' justify='center' align='center'>
                      {authUser?.id === Number(params.id) && (
                        <Button
                          type='button'
                          color='rgb(108, 114, 127)'
                          cursor='pointer'
                          bg='white'
                          w='100px'
                          size='sm'
                          onClick={() => setModalCity(true)}
                        >
                          Изменить
                        </Button>
                      )}
                    </Flex>
                  </GridItem>
                </Grid>
              </form>
            </Box>
          </Flex>
        </GridItem>
        <GridItem
          colSpan={2}
          bg='rgb(255, 255, 255, 0.5)'
          borderRadius='8px'
          overflow='scroll'
        >
          {/* items */}
          <div className='bg-transparent px-4 py-5 sm:px-6'>
            <div className='-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap'>
              <div className='ml-4 mt-2'>
                <h3
                  className='text-lg leading-6 font-medium text-gray-900'
                  style={{ fontSize: '2rem', color: 'rgb(98, 97, 95)' }}
                >
                  Услуги
                </h3>
              </div>
            </div>
          </div>
          {/* list items */}
          <div
            className={`bg-white shadow sm:rounded-md ${
              authUser?.id === Number(params.id)
                ? 'cursor-pointer'
                : 'cursor-default'
            }`}
            style={{
              backgroundColor: 'rgb(255, 255, 255, 0.5)',
              borderRadius: '8px',
            }}
          >
            <ul className='divide-y divide-gray-200'>
              {service &&
                service.map((position) => (
                  <li key={position.id}>
                    <div
                      onClick={() =>
                        authUser?.id === Number(params.id) &&
                        serviceItemChange(position.id)
                      }
                      className='block hover:bg-gray-50'
                    >
                      <div className='px-4 py-4 sm:px-6'>
                        <div className='flex items-center justify-between'>
                          <p
                            className='text-base font-medium truncate'
                            style={{ color: 'rgb(98, 97, 95)' }}
                          >
                            {position.title}
                          </p>
                          <div className='ml-2 flex-shrink-0 flex'>
                            <p
                              className='px-2 inline-flex  text-sm truncate'
                              style={{ color: 'rgb(124, 156, 154)' }}
                            >
                              {position.price}₽
                            </p>
                          </div>
                        </div>
                        <div className='mt-2 mt-style sm:flex sm:justify-between'>
                          <div className='sm:flex justify-between w-full'>
                            <p className='mt-2 mt-style flex items-center text-sm text-gray-500 sm:mt-0'>
                              Длительность {position.duration} мин
                            </p>
                            <p className='flex items-center text-sm text-gray-500'>
                              {position.serviceCategory.title}
                            </p>
                          </div>
                          {/* <div className='mt-2 mt-style flex items-center text-sm text-gray-500 sm:mt-0  sm:ml-6'
                          style={{ color: 'rgb(124, 156, 154)' }}
                          >
                            <p>Создано {position.createdAt.slice(0, 10)}</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </GridItem>
      </Grid>

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
                        style={{
                          fontSize: '1.5rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        О себе
                      </Dialog.Title>
                      <div className='mt-2 mt-style'>
                        <Textarea
                          id='about'
                          name='about'
                          rows={4}
                          borderRadius='8px'
                          bg='white'
                          color='rgb(108, 114, 127)'
                          border='2px solid white'
                          focusBorderColor='rgb(140, 175, 174)'
                          _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                          _active={{ borderColor: 'rgb(140, 175, 174)' }}
                          size='md'
                          defaultValue={''}
                          onChange={(e) => setTextarea(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 w-full flex justify-center'>
                    <Button
                      type='button'
                      color='rgb(108, 114, 127)'
                      cursor='pointer'
                      bg='white'
                      w='100px'
                      size='md'
                      onClick={modalTextUpdate}
                    >
                      Изменить
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Модалка для создания айтема */}
      <Transition.Root show={modalItem} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={setModalItem}>
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
                        style={{
                          fontSize: '1.5rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        Создать услугу
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className='mt-2 mt-style'>
                    <div className='mt-1'>
                      <Input
                        mb='10px'
                        name='email'
                        id='title'
                        type='email'
                        bg='white'
                        placeholder='название'
                        color='rgb(108, 114, 127)'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                        _active={{ borderColor: 'rgb(140, 175, 174)' }}
                        size='md'
                        onChange={(e) => setItemTitle(e.target.value)}
                      />
                    </div>
                    <div className='mt-1'>
                      <Select
                        mb='10px'
                        id='location'
                        size='md'
                        color='rgb(108, 114, 127)'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        bg='white'
                        name='location'
                        onChange={onChangeHandler}
                        defaultValue='Canada'
                      >
                        {categoryInfo?.data?.category.map((item) => (
                          <option key={item.id} id={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className='mt-1'>
                      <Select
                        mb='10px'
                        id='location'
                        size='md'
                        color='rgb(108, 114, 127)'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        bg='white'
                        name='location'
                        onChange={(e) =>
                          setItemDuration(e.target.value.split(' ')[0])
                        }
                        defaultValue='Canada'
                      >
                        <option>60 мин</option>
                        <option>90 мин</option>
                        <option>120 мин</option>
                      </Select>
                    </div>

                    <div className='mt-1'>
                      <div className='mt-1 relative rounded-md shadow-sm'>
                        <Input
                          name='price'
                          id='price'
                          type='text'
                          placeholder='цена ₽'
                          aria-describedby='price-currency'
                          bg='white'
                          color='rgb(108, 114, 127)'
                          border='2px solid white'
                          focusBorderColor='rgb(140, 175, 174)'
                          _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                          _active={{ borderColor: 'rgb(140, 175, 174)' }}
                          size='md'
                          onChange={(e) => setItemPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 w-full flex justify-center'>
                    <Button
                      type='button'
                      color='rgb(108, 114, 127)'
                      cursor='pointer'
                      bg='white'
                      w='100px'
                      size='md'
                      onClick={itemCreate}
                    >
                      Сохранить
                    </Button>
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
                        style={{
                          fontSize: '1.5rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        Выберите свой город
                      </Dialog.Title>
                      <div className='mt-2 mt-style'>
                        <Select // DURATION
                          size='md'
                          color='rgb(108, 114, 127)'
                          border='2px solid white'
                          focusBorderColor='rgb(140, 175, 174)'
                          bg='white'
                          name='country'
                          autoComplete='country-name'
                          onChange={onChangeHandler}
                          defaultValue={cityName}
                        >
                          {city?.data?.city.map((el) => (
                            <option key={el.id} id={el.id} value={el.name}>
                              {el.name}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 w-full flex justify-center'>
                    <Button
                      type='button'
                      color='rgb(108, 114, 127)'
                      cursor='pointer'
                      bg='white'
                      w='100px'
                      size='md'
                      onClick={cityUpdate}
                    >
                      Изменить
                    </Button>
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
                        style={{
                          fontSize: '1.5rem',
                          color: 'rgb(98, 97, 95)',
                        }}
                      >
                        Редактировать услугу
                      </Dialog.Title>
                    </div>
                  </div>
                  <div className='mt-2 mt-style'>
                    <div className='mt-1'>
                      <Input
                        mb='10px'
                        name='email'
                        id='title'
                        type='email'
                        bg='white'
                        placeholder='название'
                        color='rgb(108, 114, 127)'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                        _active={{ borderColor: 'rgb(140, 175, 174)' }}
                        size='md'
                        defaultValue={categoryInfo?.data?.category?.title}
                        onChange={(e) => setItemTitle(e.target.value)}
                      />
                    </div>
                    <div className='mt-1'>
                      <Select
                        mb='10px'
                        id='location'
                        size='md'
                        color='rgb(108, 114, 127)'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        bg='white'
                        name='location'
                        onChange={onChangeHandler}
                        defaultValue='Canada'
                      >
                        {categoryInfo?.data?.category.map((item) => (
                          <option key={item.id} id={item.id}>
                            {item.title}
                          </option>
                        ))}
                      </Select>
                    </div>

                    <div className='mt-1'>
                      <Select
                        mb='10px'
                        id='location'
                        size='md'
                        color='rgb(108, 114, 127)'
                        border='2px solid white'
                        focusBorderColor='rgb(140, 175, 174)'
                        bg='white'
                        name='location'
                        onChange={(e) =>
                          setItemDuration(e.target.value.split(' ')[0])
                        }
                        defaultValue='Canada'
                      >
                        <option>60 мин</option>
                        <option>90 мин</option>
                        <option>120 мин</option>
                      </Select>
                    </div>

                    <div className='mt-1'>
                      <div className='mt-1 relative rounded-md shadow-sm'>
                        <Input
                          name='price'
                          id='price'
                          type='text'
                          placeholder='цена ₽'
                          aria-describedby='price-currency'
                          bg='white'
                          color='rgb(108, 114, 127)'
                          border='2px solid white'
                          focusBorderColor='rgb(140, 175, 174)'
                          _focus={{ borderColor: 'rgb(140, 175, 174)' }}
                          _active={{ borderColor: 'rgb(140, 175, 174)' }}
                          size='md'
                          onChange={(e) => setItemPrice(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-5 sm:mt-6 w-full flex justify-around'>
                    <Button
                      type='button'
                      color='rgb(108, 114, 127)'
                      cursor='pointer'
                      bg='white'
                      w='100px'
                      size='md'
                      onClick={itemUpdate}
                    >
                      Сохранить
                    </Button>
                    <Button
                      type='button'
                      color='rgb(108, 114, 127)'
                      cursor='pointer'
                      bg='white'
                      w='100px'
                      size='md'
                      onClick={itemDelete}
                    >
                      Удалить
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody
            textAlign='center'
            mt='20px'
            style={{
              fontSize: '1.5rem',
              color: 'rgb(98, 97, 95)',
            }}
          >
            Доступно только авторизированным пользователям
          </ModalBody>

          <ModalFooter justifyContent='space-around'>
            <Button
              type='button'
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              w='150px'
              size='md'
              onClick={() => navigate('/auth/registration', { replace: false })}
            >
              Регистрация
            </Button>
            <Button
              type='button'
              color='rgb(108, 114, 127)'
              cursor='pointer'
              bg='white'
              w='100px'
              size='md'
              onClick={() => navigate('/auth/login', { replace: false })}
            >
              Войти
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
