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
          bg='white'
          color='rgb(108, 114, 127)'
          border='2px solid white'
          focusBorderColor='rgb(140, 175, 174)'
          size='md'
          placeholder='поиск мастера'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Box>
      <Button
        color='rgb(108, 114, 127)'
        cursor='pointer'
        bg='white'
        ml='20px'
        w='100px'
        size='md'
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
