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
import List from '../../components/List/List'
import { getDataThunk } from '../../redux/actions/resultsAction'

const Results = () => {
  const dispatch = useDispatch()
  const { categories, items, cities } = useSelector((store) => store.results)
  const [itemsByCategory, setItemsByCategory] = useState([])
  const [input, setInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')

  useEffect(() => {
    if (selectedCategory) {
      const categoryByTitle = categories.find(
        (category) => category.title === selectedCategory
      )
      setItemsByCategory(
        items.filter((item) => item.serviceCategoryId === categoryByTitle.id)
      )
    } else {
      setItemsByCategory(items)
    }
  }, [selectedCategory, categories, items])

  useEffect(() => {
    dispatch(getDataThunk())
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Select // CITIES
            placeholder='Город'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities?.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </Select>
          <Select //CATEGORIES
            placeholder='Категория'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </Select>
          <Select // ITEMS
            placeholder='Услуга'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            {itemsByCategory?.map((item) => (
              <option key={item.id} value={item.title}>
                {item.title}
              </option>
            ))}
          </Select>
          <Select // DURATION
            placeholder='Длительность'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
            onChange={(e) => setSelectedDuration(e.target.value)}
          >
            <option value='30'>30 минут</option>
            <option value='60'>60 минут</option>
            <option value='90'>90 минут</option>
            <option value='120'>120 минут</option>
          </Select>
          <Select // PRICES
            placeholder='Цена'
            size='md'
            color='rgb(33, 41, 54)'
            bg='white'
            onChange={(e) => setSelectedPrice(e.target.value)}
          >
            <option value='cheap'>Сначала дешевле</option>
            <option value='expensive'>Сначала дороже</option>
          </Select>
        </Stack>
      </GridItem>
      <GridItem colSpan={4} bg='white' borderRightRadius='8px'>
        <List
          selectedCity={selectedCity}
          selectedCategory={selectedCategory}
          selectedItem={selectedItem}
          selectedDuration={selectedDuration}
          selectedPrice={selectedPrice}
        />
      </GridItem>
    </Grid>
  )
}

export default Results
