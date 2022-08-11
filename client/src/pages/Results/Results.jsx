import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getSearchDataThunk,
  sendSearch,
} from '../../redux/actions/searchAction'
import { useNavigate } from 'react-router-dom'
import List from '../../components/List/List'

const Results = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState('')

  return (
    <Grid
      h='100%'
      templateRows='repeat(1, 1fr)'
      templateColumns='repeat(6, 1fr)'
      gap={4}
      p='10px'
    >
      <GridItem rowSpan={1} colSpan={2} bg='rgb(33, 41, 54)' borderRadius='8px'>
        <Flex p='20px' w='100%' justify='center' align='top'>
          <Box w='90%'>
            <Input
              color='rgb(33, 41, 54)'
              bg='white'
              placeholder='поиск категории или мастера'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Box>
          <Button
            ml='20px'
            colorScheme='blue'
            onClick={() => {
              dispatch(sendSearch(input))
              navigate('/results', { replace: true })
            }}
          >
            Найти
          </Button>
        </Flex>
        <Stack spacing={3} p='20px'>
          <Select
            placeholder='Город'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          />
          <Select
            placeholder='Категория'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          />
          <Select
            placeholder='Услуга'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          />
          <Select
            placeholder='Длительность'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          />
          <Select
            placeholder='Цена'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          />
        </Stack>
      </GridItem>
      <GridItem colSpan={4} bg='white' borderRightRadius='8px'>
        <List />
      </GridItem>
    </Grid>
  )
}

export default Results
