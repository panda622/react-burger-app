import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawler: false,
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawler: false });
  };

  sideDrawerTogglehandler = () => {
    this.setState((state) => {
      return { showSideDrawler: !state.showSideDrawler };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar drawerToggleClick={this.sideDrawerTogglehandler} />
        <SideDrawer
          open={this.state.showSideDrawler}
          closed={this.sideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
