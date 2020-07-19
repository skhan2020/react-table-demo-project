import { flattenObject } from '../../helper/index'

export const showModal = (state) => {
  return state.get('showModal');
}

export const getDessertList = (state) => {
  const currentList = state.get('dessertList');
  const flatArray = currentList.map((item) => flattenObject(item));
  return currentList.length ? flatArray : [];
}