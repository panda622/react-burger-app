import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummaray from "../../components/Burger/OrderSummary/OrderSummary";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1,
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
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

    return (
      <Aux>
        <Modal>
          <OrderSummaray ingredients={this.state.ingredients} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
