import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Flex, Box } from '@chakra-ui/react'
import {
  getSearchDataThunk,
  sendSearch,
} from '../../redux/actions/searchAction'
import { Outlet, useNavigate } from 'react-router-dom'

const SearchForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  useEffect(() => {
    dispatch(getSearchDataThunk())
  }, [dispatch])

  const data = useSelector((store) => store.search)
  const filtredData = data.filter(
    (item) =>
      item?.username?.toLowerCase().includes(input) ||
      item?.title?.toLowerCase().includes(input)
  )

  return (
    <Flex>
      <Box>
        <Input
          placeholder='Basic usage'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Box>
          {data.length !== filtredData.length &&
            filtredData.map((search, index) => (
              <Box
                key={index}
                onClick={(e) => {
                  dispatch(sendSearch(e.target.innerText))
                  navigate('/search/results', { replace: true })
                }}
              >
                {search?.username || search?.title}
              </Box>
            ))}
        </Box>
      </Box>
      <Button
        colorScheme='blue'
        onClick={() => {
          dispatch(sendSearch(input))
          navigate('/search/results', { replace: true })
        }}
      >
        Button
      </Button>
      <Outlet />
    </Flex>
  )
}

export default SearchForm
