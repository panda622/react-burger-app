import { takeEvery, put, all } from "redux-saga/effects";
import {
  FETCH_INGREDIENT_ASYNC,
  FETCH_INGREDIENT_FAIL,
  FETCH_INGREDIENT,
} from "./redux/burger/burgerAction";
import Api from "./axios-orders";

export function* fetchData(action) {
  console.log("sasa fetchdata");
  try {
    const data = yield Api.get(
      "https://burger-project-react-b178e.firebaseio.com/ingredients.json"
    );
    console.log("sasa fetchdata data", data);
    yield put({ type: FETCH_INGREDIENT, data });
  } catch (error) {
    // console.log("sasa fetchdata error", error);
    // yield put({ type: FETCH_INGREDIENT_FAIL, error });
  }
}

export function* fetchIngredient() {
  console.log("watchFetchData");
  yield takeEvery(FETCH_INGREDIENT_ASYNC, fetchData);
}

export default function* rootSaga() {
  yield all([fetchIngredient()]);
}
