import {
  ChevronRightIcon,
  LocationMarkerIcon,
  MailIcon,
} from '@heroicons/react/solid'
import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// перевод месяцев на русский
const changeMonthLanguage = (date) => {
  const RussianMonth = {
    Jan: 'янв',
    Feb: 'фев',
    Mar: 'мар',
    Apr: 'апр',
    May: 'май',
    Jun: 'июн',
    Jul: 'июл',
    Aug: 'авг',
    Sep: 'сен',
    Oct: 'окт',
    Nov: 'ноя',
    Dec: 'дек',
  }
  const dateArray = date.split(' ')
  for (let key in RussianMonth) {
    if (key === dateArray[0]) return `${RussianMonth[key]} ${dateArray[1]}`
  }
}

const ListChildren = ({ selectedMasters, selectedItem }) => {
  const navigate = useNavigate()
  const { categories, items, cities } = useSelector((store) => store.results)

  return (
    <div
      className='shadow overflow-hidden sm:rounded-md'
      style={{ backgroundColor: 'rgb(255, 255, 255, 0.5)' }}
    >
      <ul className='divide-y divide-gray-200'>
        {selectedMasters?.map((selectedMaster) => (
          <li key={selectedMaster.id}>
            <div className='block hover:bg-gray-50'>
              <div className='flex items-center px-4 py-4 sm:px-6'>
                <div className='min-w-0 flex-1 flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-12 w-12 rounded-full'
                      src={`/${selectedMaster.userPic}`}
                      alt='master'
                    />
                  </div>
                  <div className='min-w-0 flex-1 items-center px-4 md:grid md:grid-cols-3 md:gap-4'>
                    <div>
                      <p
                        className='text-base font-medium truncate'
                        style={{ color: 'rgb(98, 97, 95)' }}
                      >
                        {selectedMaster.username}
                      </p>
                      <p className='mt-2 flex items-center text-sm text-gray-500'>
                        <MailIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='truncate'>{selectedMaster.email}</span>
                      </p>
                    </div>
                    <div className='flex items-center pl-2'>
                      <div
                        className='mt-2 flex flex-col items-start text-sm truncate'
                        style={{ color: 'rgb(98, 97, 95)' }}
                      >
                        {selectedItem ? (
                          <>
                            {items?.map((item) => {
                              if (
                                item.masterId === selectedMaster.id &&
                                item.title === selectedItem
                              ) {
                                return (
                                  <p
                                    key={item.id}
                                    className='truncate mb-1 pl-5 flex flex-col'
                                  >
                                    <span>{`${item.duration} минут`}</span>
                                    <span>{`${item.price} руб`}</span>
                                  </p>
                                )
                              } else {
                                return null
                              }
                            })}
                          </>
                        ) : (
                          <>
                            {items
                              ?.reduce((acc, item) => {
                                if (
                                  item.masterId === selectedMaster.id &&
                                  !acc.find(
                                    (el) => el.id === item.serviceCategoryId
                                  )
                                ) {
                                  acc.push(
                                    categories?.find(
                                      (el) => el.id === item.serviceCategoryId
                                    )
                                  )
                                }
                                return acc
                              }, [])
                              .map((item) => (
                                <span key={item.id} className='truncate mb-1'>
                                  {item.title}
                                </span>
                              ))}
                          </>
                        )}
                      </div>
                    </div>

                    <div className='hidden md:block'>
                      <div>
                        <p
                          className='text-sm'
                          style={{ color: 'rgb(124, 156, 154)' }}
                        >
                          Работает с{' '}
                          <time dateTime={selectedMaster.createdAt}>
                            {changeMonthLanguage(
                              moment(selectedMaster.createdAt).format(
                                'MMM YYYY'
                              )
                            )}
                          </time>
                        </p>
                        <p className='mt-2 flex items-center text-sm text-gray-500'>
                          <LocationMarkerIcon
                            className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                            aria-hidden='true'
                          />
                          {
                            cities?.filter(
                              (city) => city.id === selectedMaster.cityId
                            )[0].name
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className='cursor-pointer'
                  onClick={() =>
                    navigate(`/masters/${selectedMaster.id}/profile`, {
                      replace: true,
                    })
                  }
                >
                  <ChevronRightIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListChildren
