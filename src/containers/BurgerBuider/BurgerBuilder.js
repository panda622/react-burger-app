import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummaray from "../../components/Burger/OrderSummary/OrderSummary";
import axiosOrder from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "axios";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    console.log("BurgerBuilder mount");
    axios
      .get("https://burger-project-react-b178e.firebaseio.com/ingredients.json")
      .then((res) => {
        console.log("res", res);
        this.setState({ ingredients: res.data });
      });
  }

  togglePurchasingState = () => {
    this.setState((state, props) => {
      const purchasing = state.purchasing;
      return {
        purchasing: !purchasing,
      };
    });
  };

  updatePurchasableState = () => {
    this.setState((state, _props) => {
      const ingredients = {
        ...state.ingredients,
      };
      const sum = Object.keys(ingredients)
        .map((igkey) => ingredients[igkey])
        .reduce((sum, el) => sum + el, 0);
      return { purchasable: sum > 0 };
    });
  };

  purchaseContinue = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "My computer",
        mobile: "0909090909",
        gender: "m",
        address: "HCM",
      },
    };
    axiosOrder
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(() => {
        this.setState({ loading: false, purchasing: false });
      });
  };

  addIngredientHandler = (type) => {
    const updatedIngredient = {
      ...this.state.ingredients,
    };
    updatedIngredient[type] += 1;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    this.updatePurchasableState();
  };

  removeIngredientHandler = (type) => {
    const updatedIngredient = {
      ...this.state.ingredients,
    };

    if (updatedIngredient[type] < 0) {
      return;
    }

    updatedIngredient[type] -= 1;
    const priceRemove = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceRemove;
    this.setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    this.updatePurchasableState();
  };

  render() {
    let disableInfo = {
      ...this.state.ingredients,
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = <Spinner />;

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummaray
          closeModal={this.togglePurchasingState}
          ingredients={this.state.ingredients}
          purchaseContinue={this.purchaseContinue}
          totalPrice={this.state.totalPrice}
        />
      );
      burger = (
        <Aux>
          <Modal
            closeModal={this.togglePurchasingState}
            show={this.state.purchasing}
          >
            {orderSummary}
          </Modal>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            price={this.state.totalPrice}
            purchasable={this.state.purchasable}
            purchasing={this.togglePurchasingState}
          />
        </Aux>
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return burger;
  }
}

export default withErrorHandler(BurgerBuilder, axiosOrder);
