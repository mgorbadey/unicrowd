import { Grid, GridItem } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ListBody from '../../components/ListBody/ListBody'
import ResultForm from '../../components/ResultForm/ResultForm'
import ResultSelect from '../../components/ResultSelect/ResultSelect'
import { getDataThunk } from '../../redux/actions/resultsAction'

const Results = () => {
  const dispatch = useDispatch()

  const [selectedCity, setSelectedCity] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedItem, setSelectedItem] = useState('')
  const [selectedDuration, setSelectedDuration] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('')

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
      <GridItem
        rowSpan={1}
        colSpan={2}
        bg='rgb(255, 255, 255, 0.5)'
        borderRadius='8px'
      >
        <ResultForm />
        <ResultSelect
          selectedCategory={selectedCategory}
          selectedItem={selectedItem}
          setSelectedCity={setSelectedCity}
          setSelectedCategory={setSelectedCategory}
          setSelectedItem={setSelectedItem}
          setSelectedDuration={setSelectedDuration}
          setSelectedPrice={setSelectedPrice}
        />
      </GridItem>
      <GridItem
        colSpan={4}
        bg='rgb(255, 255, 255, 0.5)'
        borderRadius='8px'
        overflow='scroll'
      >
        <ListBody
          selectedCity={selectedCity}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedItem={selectedItem}
          selectedDuration={selectedDuration}
          selectedPrice={selectedPrice}
        />
      </GridItem>
    </Grid>
  )
}

export default Results
