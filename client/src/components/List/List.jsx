import React from 'react'
import {
  CheckCircleIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  MailIcon,
} from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import moment from 'moment'

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

const List = () => {
  const string = useSelector((store) => store.search)
  const { categories, items, masters, cities } = useSelector(
    (store) => store.results
  )
  const filteredMasters = masters?.reduce((acc, master) => {
    if (
      master?.username?.toLowerCase().includes(string.toLowerCase()) ||
      categories
        ?.filter((category) =>
          category.title.toLowerCase().includes(string.toLowerCase())
        )
        .reduce((accum, el) => {
          if (
            items?.find(
              (item) =>
                item.masterId === master.id && item.serviceCategoryId === el.id
            )
          ) {
            accum += 1
          }
          return accum
        }, 0)
    ) {
      acc.push(master)
    }
    return acc
  }, [])

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-md'>
      <ul className='divide-y divide-gray-200'>
        {filteredMasters?.map((filteredMaster) => (
          <li key={filteredMaster.id}>
            <a
              href={`/masters/${filteredMaster.id}/profile`}
              className='block hover:bg-gray-50'
            >
              <div className='flex items-center px-4 py-4 sm:px-6'>
                <div className='min-w-0 flex-1 flex items-center'>
                  <div className='flex-shrink-0'>
                    <img
                      className='h-12 w-12 rounded-full'
                      src={`/${filteredMaster.userPic}`}
                      alt='master'
                    />
                  </div>
                  <div className='min-w-0 flex-1 px-4 md:grid md:grid-cols-3 md:gap-4'>
                    <div>
                      <p className='text-sm font-medium text-indigo-600 truncate'>
                        {filteredMaster.username}
                      </p>
                      <p className='mt-2 flex items-center text-sm text-gray-500'>
                        <MailIcon
                          className='flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400'
                          aria-hidden='true'
                        />
                        <span className='truncate'>{filteredMaster.email}</span>
                      </p>
                    </div>
                    <div className='flex items-center pl-2'>
                      <p className='mt-2 flex items-center text-sm text-indigo-600 truncate'>
                        {items
                          ?.reduce((acc, item) => {
                            if (
                              item.masterId === filteredMaster.id &&
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
                            <span key={item.id} className='truncate'>
                              {item.title}
                            </span>
                          ))}
                      </p>
                    </div>

                    <div className='hidden md:block'>
                      <div>
                        <p className='text-sm text-indigo-600'>
                          Работает с{' '}
                          <time dateTime={filteredMaster.createdAt}>
                            {changeMonthLanguage(
                              moment(filteredMaster.createdAt).format(
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
                              (city) => city.id === filteredMaster.cityId
                            )[0].name
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <ChevronRightIcon
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List
