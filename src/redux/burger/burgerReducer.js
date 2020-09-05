import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  FETCH_INGREDIENT,
} from "./burgerAction";

const initialState = {
  ingredients: {
    salad: 0,
    cheese: 0,
    meat: 0,
    bacon: 0,
  },
  totalPrice: 1,
  isLoading: true,
};

function burgerReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INGREDIENT:
      const newState = { ...state };
      newState.ingredients = { ...action.data.data };
      newState.isLoading = false;
      console.log("new state", newState);
      return newState;
    case ADD_INGREDIENT:
      return {
        ...state.ingredients,
        [action.ingridentType]: state.ingredients[action.ingridentType]++,
      };
    case REMOVE_INGREDIENT:
      return {
        ...state.ingredients,
        [action.ingridentType]: state.ingredients[action.ingridentType]--,
      };
    default:
      return state;
  }
}

export default burgerReducer;
