import React, { Component } from "react";
import Aux from "../Aux/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use(
        (request) => {
          this.setState({ error: null });
          return request;
        },
        (error) => {
          console.log("Order Request Failed To Send", error);
          this.setState({ error });
          return Promise.reject(error);
        }
      );

      axios.interceptors.response.use(null, (error) => {
        this.setState({ error });
        console.log("Order Response Failed", error);
        return Promise.reject(error);
      });
    }

    closedModalError = () => {
      this.setState((state, props) => {
        return { error: null };
      });
    };

    render() {
      return (
        <Aux>
          <Modal closeModal={this.closedModalError} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
