/*
 * action types
 */

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const FETCH_INGREDIENT = "FETCH_INGREDIENT";
export const FETCH_INGREDIENT_ASYNC = "FETCH_INGREDIENT_ASYNC";
export const FETCH_INGREDIENT_SUCCESS = "FETCH_INGREDIENT_SUCCESS";
export const FETCH_INGREDIENT_FAIL = "FETCH_INGREDIENT_FAIL";

/*
 * action creators
 */

export function addIngredient(ingredientTYpe) {
  return { type: ADD_INGREDIENT, ingredientTYpe };
}

export function removeIngredient(ingredientTYpe) {
  return { type: REMOVE_INGREDIENT, ingredientTYpe };
}

export function fetchIngredient(payload) {
  return { type: FETCH_INGREDIENT, payload };
}

export function fetchIngredientAsync() {
  return { type: FETCH_INGREDIENT_ASYNC };
}
