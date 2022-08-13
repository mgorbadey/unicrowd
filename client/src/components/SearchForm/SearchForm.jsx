// import React, { useEffect, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { Input, Button, Flex, Box } from '@chakra-ui/react'
// import { saveSearch } from '../../redux/actions/searchAction'
// import { useNavigate } from 'react-router-dom'
// import $api from '../../http'

// const SearchForm = () => {
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [input, setInput] = useState('')
//   const [backData, setBackData] = useState([])

//   const getArrayStrings = async () => {
//     try {
//       const response = await $api.get('/search')
//       setBackData(response.data)
//     } catch (error) {
//       console.log(error.message)
//     }
//   }

//   useEffect(() => {
//     getArrayStrings()
//   }, [])

//   const filteredData = backData.filter((string) =>
//     string?.toLowerCase().includes(input)
//   )

//   return (
//     <Flex h='100%' w='100%' justify='center' align='center'>
//       <Box w='80%'>
//         <Input
//           placeholder='поиск категории или мастера'
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         {backData.length !== filteredData.length && (
//           <Box border='2px dashed grey' borderRadius='5px' px='10px' py='5px'>
//             {filteredData.map((string, index) => (
//               <Box
//                 cursor='pointer'
//                 key={index}
//                 onClick={(e) => {
//                   dispatch(saveSearch(e.target.innerText))
//                   navigate('/results', { replace: true })
//                 }}
//               >
//                 {string}
//               </Box>
//             ))}
//           </Box>
//         )}
//       </Box>
//       <Button
//         ml='30px'
//         colorScheme='blue'
//         onClick={() => {
//           dispatch(saveSearch(input))
//           navigate('/results', { replace: true })
//         }}
//       >
//         Найти
//       </Button>
//     </Flex>
//   )
// }

// export default SearchForm
