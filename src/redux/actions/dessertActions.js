export const UPDATE_DESSERT_LIST = "UPDATE_DESSERT_LIST";
export const SHOW_MODAL = 'SHOW_MODAL';
export const ADD_DESSERT = 'ADD_DESSERT';
export const DELETE_DESSERT = 'DELETE_DESSERT';

export function updateDessertList(dessertList) {
  return {
    type: UPDATE_DESSERT_LIST,
    payload: {
      dessertList,
    }
  };
}

export function setShowModal(value) {
  return {
    type: SHOW_MODAL,
    payload: {
      value,
    }
  };
}

export function addDessert(value) {
  return {
    type: ADD_DESSERT,
    payload: {
      value,
    }
  };
}

export function removeDeletedDessert(list) {
  return {
    type: DELETE_DESSERT,
    payload: {
      list,
    }
  };
}

