import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getSearchDataThunk } from '../../redux/actions/searchAction'
import SearchModal from '../SearchModal/SearchModal'

const SearchForm = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  const { masters, categories } = useSelector((store) => store.search)
  // console.log('masters: ', masters);
  // console.log('categories: ', categories);

  // const filtredSearch = categories.filter((category) => category.title.includes(input))
  // console.log('filtredSearch: ', filtredSearch);

  useEffect(() => {
    dispatch(getSearchDataThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex justify-around'>
      <div className='mt-1'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type='text'
          name='name'
          id='name'
          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 px-4 rounded-full'
          placeholder='Search'
        />
        <SearchModal />
      </div>
      <button
        type='button'
        className='inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Найти
      </button>
    </div>
  )
}

export default SearchForm
