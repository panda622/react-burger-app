import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 1,
};
class BurgerBuilder extends Component {
  state = {
    ingredient: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
  };

  addIngredientHandler = (type) => {
    const updatedIngredient = {
      ...this.state.ingredient,
    };
    updatedIngredient[type] += 1;

    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ ingredient: updatedIngredient, totalPrice: newPrice });
  };

  removeIngredientHandler = (type) => {
    const updatedIngredient = {
      ...this.state.ingredient,
    };

    if (updatedIngredient[type] > 0) {
      updatedIngredient[type] -= 1;
    } else {
      updatedIngredient[type] = 0;
    }
    this.setState({ ingredient: updatedIngredient });
  };

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredient} />
        <BuildControls ingredientAdded={this.addIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;
