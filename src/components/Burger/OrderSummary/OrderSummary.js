import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Orders</h3>
      <p>A Delicious with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>{props.totalPrice.toFixed(2)}$</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.closeModal} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
