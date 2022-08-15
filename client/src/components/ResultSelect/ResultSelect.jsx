import { Stack, Select } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ResultSelect = ({
  selectedCategory,

  selectedItem,
  setSelectedCity,
  setSelectedCategory,
  setSelectedItem,
  setSelectedDuration,
  setSelectedPrice,
}) => {
  const { categories, items, cities } = useSelector((store) => store.results)
  const [itemsByCategory, setItemsByCategory] = useState([])

  useEffect(() => {
    setSelectedItem('')
    setSelectedDuration('')
    setSelectedPrice('')
    if (selectedCategory) {
      const categoryByTitle = categories.find(
        (category) => category.title === selectedCategory
      )
      setItemsByCategory(
        items
          .filter((item) => item.serviceCategoryId === categoryByTitle.id)
          .reduce((acc, item, index) => {
            if (index === 0) {
              acc.push(item)
              return acc
            } else if (!acc.find((el) => el.title === item.title)) {
              acc.push(item)
              return acc
            }
            return acc
          }, [])
      )
    } else {
      setItemsByCategory(items)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, categories, items])

  return (
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
        disabled={selectedCategory ? false : true}
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
        disabled={selectedItem ? false : true}
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
        disabled={selectedItem ? false : true}
        onChange={(e) => setSelectedPrice(e.target.value)}
      >
        <option value='cheap'>Сначала дешевле</option>
        <option value='expensive'>Сначала дороже</option>
      </Select>
    </Stack>
  )
}

export default ResultSelect
