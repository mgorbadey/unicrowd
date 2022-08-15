import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import ListChildren from '../ListChildren/ListChildren'

const ListBody = ({
  selectedCity,
  selectedCategory,
  selectedItem,
  selectedDuration,
  selectedPrice,
}) => {
  const string = useSelector((store) => store.search)
  const { categories, items, masters, cities } = useSelector(
    (store) => store.results
  )
  // фильтрую мастеров под входные условия из инпута
  const filteredMasters = masters?.reduce((acc, master) => {
    if (
      master?.username?.toLowerCase().includes(string.toLowerCase()) ||
      categories
        ?.filter((category) =>
          category.title.toLowerCase().includes(string.toLowerCase())
        )
        .reduce((accum, el) => {
          if (
            items?.find(
              (item) =>
                item.masterId === master.id && item.serviceCategoryId === el.id
            )
          ) {
            accum += 1
          }
          return accum
        }, 0)
    ) {
      acc.push(master)
    }
    return acc
  }, [])
  // фильтрую мастеров по селектам
  const selectedMasters = filteredMasters
    // по городам
    ?.reduce((acc, master) => {
      if (selectedCity) {
        const foundedCity = cities?.find((city) =>
          city.name.includes(selectedCity)
        )
        if (foundedCity.id === master.cityId) {
          acc.push(master)
        }
      } else {
        acc.push(master)
      }
      return acc
    }, [])
    //по категориям
    .reduce((acc, master) => {
      if (selectedCategory) {
        const foundedCategory = categories?.find((category) =>
          category.title.includes(selectedCategory)
        )
        if (
          items?.filter(
            (item) =>
              item.serviceCategoryId === foundedCategory.id &&
              item.masterId === master.id
          ).length
        ) {
          acc.push(master)
        }
      } else {
        acc.push(master)
      }
      return acc
    }, [])
    // по услугам
    .reduce((acc, master) => {
      if (selectedItem) {
        const itemsBySelect = items?.filter(
          (item) => item.title === selectedItem
        )
        if (itemsBySelect.find((item) => item.masterId === master.id)) {
          acc.push(master)
        }
      } else {
        acc.push(master)
      }
      return acc
    }, [])
    // по длительности
    .reduce((acc, master) => {
      if (selectedDuration) {
        const itemsByDuration = items?.filter(
          (item) =>
            item.duration === Number(selectedDuration) &&
            item.title === selectedItem
        )
        if (
          itemsByDuration.length &&
          itemsByDuration.find((item) => item.masterId === master.id)
        ) {
          acc.push(master)
        }
      } else {
        acc.push(master)
      }
      return acc
    }, [])
    // по цене
    .sort((masterA, masterB) => {
      if (selectedPrice) {
        const newMasterA = {
          ...masterA,
          price: masterA.serviceItem.find((item) => item.title === selectedItem)
            .price,
        }
        const newMasterB = {
          ...masterB,
          price: masterB.serviceItem.find((item) => item.title === selectedItem)
            .price,
        }
        return selectedPrice === 'cheap'
          ? newMasterA.price - newMasterB.price
          : newMasterB.price - newMasterA.price
      }
      return masterA.id - masterB.id
    })

  return (
    <>
      {selectedMasters?.length ? (
        <ListChildren
          selectedMasters={selectedMasters}
          selectedItem={selectedItem}
        />
      ) : (
        <Flex justify='center' align='center' minH='100%'>
          <Box>Мастера по вашему запросу не найдены</Box>
        </Flex>
      )}
    </>
  )
}

export default ListBody
