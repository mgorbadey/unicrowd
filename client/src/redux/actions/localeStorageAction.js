import localeStorageType from '../types/localeStorageType'

export const getAuthRender = () => ({
  type: localeStorageType.SAVE_TO_STORAGE,
})

export const getNotAuthRender = () => ({
  type: localeStorageType.DELETE_FROM_STORAGE,
})
