import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button, Flex, Box } from '@chakra-ui/react'
import { saveSearch } from '../../redux/actions/searchAction'
import { useNavigate } from 'react-router-dom'
import $api from '../../http'

const SearchForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [backData, setBackData] = useState([])

  const getArrayStrings = async () => {
    try {
      const response = await $api.get('/search')
      setBackData(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getArrayStrings()
  }, [])

  const filteredData = backData.filter((string) =>
    string?.toLowerCase().includes(input)
  )

  return (
    <>
      <Flex direction='column'>
        <div className='max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8'>
          <h1
            className='mt-2 text-4xl font-bold text-white tracking-tight sm:text-5xl sm:tracking-tight'
            style={{ fontSize: '6rem' }}
          >
            unicrowd
          </h1>
          <p className='mt-2 text-lg font-medium text-black text-opacity-50'>
            Объединяем лучших
          </p>
        </div>
        <Flex h='100%' w='100%' justify='center' align='center'>
          <Box w='70%'>
            <Input
              bg='white'
              color='rgb(108, 114, 127)'
              size='lg'
              border='2px solid white'
              focusBorderColor='rgb(159, 196, 194)'
              placeholder='поиск категории или мастера'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
          <Button
            color='rgb(108, 114, 127)'
            cursor='default'
            ml='30px'
            w='100px'
            bg='white'
            size='lg'
            onClick={() => {
              dispatch(saveSearch(input))
              navigate('/results', { replace: true })
            }}
          >
            Найти
          </Button>
        </Flex>
        <Box ml='120px'>
          {backData.length !== filteredData.length && (
            <Box
              border='2px solid white'
              bg='white'
              borderRadius='5px'
              mt='5px'
              px='10px'
              py='5px'
              w='77%'
            >
              {filteredData.map((string, index) => (
                <Box
                  cursor='pointer'
                  color='rgb(108, 114, 127)'
                  key={index}
                  onClick={(e) => {
                    dispatch(saveSearch(e.target.innerText))
                    navigate('/results', { replace: true })
                  }}
                >
                  {string}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Flex>
    </>
  )
}

export default SearchForm
