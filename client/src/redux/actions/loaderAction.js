import loaderType from '../types/loaderType'

export const setHLTrue = () => ({
  type: loaderType.SET_HEADER_TRUE,
})

export const setHLFalse = () => ({
    type: loaderType.SET_HEADER_FALSE,
  })

  export const setBLTrue = () => ({
    type: loaderType.SET_BODY_TRUE,
  })

  export const setBLFalse = () => ({
    type: loaderType.SET_BODY_FALSE,
  })
