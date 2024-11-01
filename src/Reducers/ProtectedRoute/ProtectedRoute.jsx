import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

class ProtectedRoute extends React.Component {
  render() {
    const { component: Component, ...props } = this.props;
    // If authorized then move ahead or redirect
    return (
      <Route
        {...props}
        render={(props) =>
          this.props.token ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.loginDetails.token,
  };
};

export default connect(mapStateToProps, undefined)(ProtectedRoute);
