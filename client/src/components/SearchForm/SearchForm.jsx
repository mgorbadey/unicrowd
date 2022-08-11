import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Input, Button, Flex, Box } from '@chakra-ui/react'
import {
  getSearchDataThunk,
  sendSearch,
} from '../../redux/actions/searchAction'
import { useNavigate } from 'react-router-dom'

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
    <Flex h='100%' w='100%' justify='center' align='center'>
      <Box w='80%'>
        <Input
          placeholder='поиск категории или мастера'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {data.length !== filtredData.length && (
          <Box border='2px dashed grey' borderRadius='5px' px='10px' py='5px'>
            {filtredData.map((search, index) => (
              <Box
                cursor='pointer'
                key={index}
                onClick={(e) => {
                  dispatch(sendSearch(e.target.innerText))
                  navigate('/results', { replace: true })
                }}
              >
                {search?.username || search?.title}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <Button
        ml='30px'
        colorScheme='blue'
        onClick={() => {
          dispatch(sendSearch(input))
          navigate('/results', { replace: true })
        }}
      >
        Найти
      </Button>
    </Flex>
  )
}

export default SearchForm
