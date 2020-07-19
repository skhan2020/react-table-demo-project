
import { createStore } from "redux";
import dessertReducer from "./reducers/dessertReducer";

const store = createStore(dessertReducer);

export default store;