import { UPDATE_DESSERT_LIST, SHOW_MODAL, ADD_DESSERT, DELETE_DESSERT } from '../actions/dessertActions';
import Immutable from 'immutable';

export const initialState = new Immutable.Map({
  dessertList: Immutable.List([]),
  showModal: false,
});

const dessertReducer = (state = initialState, action) => {
  let payload = action.payload;
  switch (action.type) {
    case UPDATE_DESSERT_LIST:
      return state.set('dessertList', payload.dessertList);
    case ADD_DESSERT:
      return state.set('dessertList', [...state.get('dessertList'), payload.value]);
    case SHOW_MODAL:
      return state.set('showModal', payload.value);
    case DELETE_DESSERT:
      const currentList = state.get('dessertList');
      const newList = currentList.filter(item => !payload.list.includes(parseInt(item.id)));
      return state.set('dessertList', newList);
    default:
      break
  }
  return state;
}

export default dessertReducer;