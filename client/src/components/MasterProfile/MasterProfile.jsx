import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useClipboard } from 'use-clipboard-copy';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function MasterProfile() {
    const [img, setImg] = React.useState(null)
    const [avatar, setAvatar] = React.useState(null)
    const [info, setInfo] = React.useState({})
    const [open, setOpen] = useState(false)
    const [modalItem, setModalItem] = useState(false)
    const [modalCity, setModalCity] = useState(false)
    const [city, setCity] = useState(null)
    const [select, setSelect] = useState(null)
    const [categoryInfo, setCategoryInfo] = useState(null)
    const [itemTitle, setItemTitle] = useState('')
    const [itemDuration, setItemDuration] = useState('')
    const [itemPrice, setItemPrice] = useState('')
    // const [cityChange, setCityChange] = useState(null)
    // const [save, setSave] = useState(false)
    const [textarea, setTextarea] = useState(null)

    const clipboard = useClipboard();
    const params = useParams()

    const sendFile = React.useCallback(async () => {
        try {
            const data = new FormData()
            data.append('avatar', img)
            data.append('id', params.id)

            const res = await axios.post('http://localhost:3500/api/upload', data, {
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })

            setAvatar(res.data.path)

        } catch (error) {
            console.log(error.message)
        }
    }, [img])

    // const updateProfileInfo = async (e) => {

    //     try {
    //         const res = await axios.post(`http://localhost:3500/masters/updateProfile`, { id: params.id, textarea })
    //         console.log(res)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }

    const modalTextUpdate = async (e) => {
        try {
            const res = await axios.post(`http://localhost:3500/masters/modalTextUpdate`, { id: params.id, textarea })
            console.log(res)
        } catch (error) {
            console.log(error.message)
        }

        setOpen(false)
    }

    const onChangeHandler = (e) => {
        const index = e.target.selectedIndex;
        const el = e.target.childNodes[index]
        const option = el.getAttribute('id');

        setSelect(option)
    }

    const cityUpdate = async (e) => {
        try {
            const res = await axios.post(`http://localhost:3500/masters/cityUpdate`, { id: params.id, city: select })
        } catch (error) {
            console.log(error.message)
        }

        setModalCity(false)
    }

    const itemCreate = async (e) => {
        try {
            const res = await axios.post(`http://localhost:3500/masters/createItem`, { masterId: params.id, categoryId: select, title: itemTitle, duration: itemDuration, price: itemPrice})
        } catch (error) {
            console.log(error.message)
        }

        setModalItem(false)
    }

    const getUserInfo = async (e) => {
        const userInfo = await axios.get(
            `http://localhost:3500/masters/${params.id}/profile`
        )

        const cityInfo = await axios.get(`http://localhost:3500/masters/cityInfo`)
        const categoryInfo = await axios.get(`http://localhost:3500/masters/categoryInfo`)
        console.log(cityInfo, '///// city information')
        console.log(userInfo, '///// user information')
        console.log(categoryInfo, '///// category information')
        setCity(cityInfo)
        setInfo(userInfo)
        setCategoryInfo(categoryInfo)
    }

    React.useEffect(() => {
        getUserInfo()
    }, [avatar]);

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
                    <div className="ml-4 mt-2 flex-shrink-0">
                        <button
                            type="button"
                            className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={() => setModalItem(true)}
                        >
                            Create new job
                        </button>
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
                                            )}                                        </span>
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

                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5'>
                                <label
                                    htmlFor='about'
                                    className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                                >
                                    О себе
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2 flex items-center'>
                                    <textarea
                                        id='about'
                                        name='about'
                                        rows={3}
                                        disabled
                                        className='max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md'
                                        defaultValue={info?.data?.info}
                                    />

                                    <button
                                        type='button'
                                        className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                        onClick={() => setOpen(true)}
                                    >
                                        Изменить
                                    </button>
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

                            <div className='sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5' >
                                <label
                                    htmlFor='email'
                                    className='block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2'
                                >
                                    Почта
                                </label>
                                <div className='mt-1 sm:mt-0 sm:col-span-2 flex items-center'>
                                    <input
                                        id='email'
                                        name='email'
                                        type='email'
                                        disabled
                                        autoComplete='email'
                                        ref={clipboard.target}
                                        defaultValue={info?.data?.email}
                                        className='block max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                                    />

                                    <button
                                        type='button'
                                        onClick={clipboard.copy}
                                        className='ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                                    >
                                        Скопировать
                                    </button>
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
                                            defaultValue={info?.data?.city?.name}
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
                                            onChange={e => setCity(e.target.value)}
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
                                            <div className='mt-2'>
                                                <textarea
                                                    id='about'
                                                    name='about'
                                                    rows={3}
                                                    onChange={e => setTextarea(e.target.value)}
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

            {/* Модалка для создания айтема */}
            <Transition.Root show={modalItem} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setModalItem}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Создайте свою услугу
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                            Название услуги
                                        </label>
                                        <div className="mt-1">
                                            <input
                                                type="email"
                                                name="email"
                                                id="title"
                                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                                placeholder="Массаж простаты"
                                                onChange={(e) => setItemTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="mt-1">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                                                Категория услуги
                                            </label>
                                            <select
                                                id="location"
                                                name="location"
                                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                defaultValue="Canada"
                                                onChange={onChangeHandler}
                                            >
                                                {categoryInfo?.data?.category.map((item) => (
                                                    <option key={item.id} id={item.id}>{item.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mt-1">
                                            <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                                                Продолжительность услуги
                                            </label>
                                            <div className="mt-1 flex rounded-md shadow-sm">
                                                <input
                                                    type="text"
                                                    name="company-website"
                                                    id="company-website"
                                                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                                    placeholder="от 30 до 120 минут"
                                                    onChange={(e) => setItemDuration(e.target.value)}
                                                />
                                                <span className="inline-flex items-center px-3 border border-r-10 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                                    минут
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-1">
                                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                Цена услуги
                                            </label>
                                            <div className="mt-1 relative rounded-md shadow-sm">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm">₽</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    name="price"
                                                    id="price"
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                                                    placeholder="0.00"
                                                    aria-describedby="price-currency"
                                                    onChange={(e) => setItemPrice(e.target.value)}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                    <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                        RUB
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                            onClick={itemCreate}
                                        >
                                            Создать
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
                <Dialog as="div" className="relative z-10" onClose={setModalCity}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed z-10 inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-sm sm:w-full sm:p-6">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                Выберите свой город
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <select
                                                    name='country'
                                                    autoComplete='country-name'
                                                    onChange={onChangeHandler}
                                                    className='max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md'
                                                >
                                                    {city?.data?.city.map((el) => (
                                                        <option key={el.id} id={el.id}>{el.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
        </>
    )
}
