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
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveSearch } from '../../redux/actions/searchAction'
import { useNavigate } from 'react-router-dom'
import List from '../../components/List/List'
import { getDataThunk } from '../../redux/actions/resultsAction'

const Results = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [input, setInput] = useState('')
  const [category, setCategory] = useState({})
  const [item, setItem] = useState({})
  const [master, setmaster] = useState({})
  const [city, setCity] = useState({})
  const string = useSelector((store) => store.search)
  const { categories, items, masters, cities } = useSelector(
    (store) => store.results
  )

  useEffect(() => {
    dispatch(getDataThunk())
  }, [])

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
        <Stack spacing={3} p='20px'>
          <Select
            placeholder='Город'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          >
            {cities?.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </Select>
          <Select
            placeholder='Категория'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </Select>
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
          >
            <option value='30'>30 минут</option>
            <option value='60'>60 минут</option>
            <option value='90'>90 минут</option>
            <option value='120'>120 минут</option>
          </Select>
          <Select
            placeholder='Цена'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
          >
            <option value='cheap'>Сначала дешевле</option>
            <option value='expensive'>Сначала дороже</option>
          </Select>
        </Stack>
      </GridItem>
      <GridItem colSpan={4} bg='white' borderRightRadius='8px'>
        <List />
      </GridItem>
    </Grid>
  )
}

export default Results
