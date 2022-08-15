import { Box, Flex, Input, Button } from '@chakra-ui/react'
import { saveSearch } from '../../redux/actions/searchAction'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'

const ResultForm = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState('')
  return (
    <Flex p='20px' w='100%' justify='center' align='top'>
      <Box w='90%'>
        <Input
          color='rgb(33, 41, 54)'
          bg='white'
          placeholder='поиск мастера'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      <Button
        ml='20px'
        colorScheme='blue'
        onClick={() => {
          dispatch(saveSearch(input))
          setInput('')
        }}
      >
        Найти
      </Button>
    </Flex>
  )
}

export default ResultForm
