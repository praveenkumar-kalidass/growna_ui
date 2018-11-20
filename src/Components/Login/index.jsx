import React, {Component} from "react";
import {connect} from "react-redux";
import {Button} from "@material-ui/core";
import Routes from "../../Utils/Routes";
import {getUserPrivileges} from "../../Actions/User";

const mapStateToProps = (state) => (
  {
    route: state.user.route
  }
);

const mapDispatchToProps = (dispatch) => ({
  getUserPrivileges: (userId) => { dispatch(getUserPrivileges(userId)) }
});

class Login extends Component {
  signIn = (userId) => {
    this.props.getUserPrivileges(userId);
  }

  componentWillReceiveProps(nextProps) {
    this.props.history.push(`${Routes[nextProps.route]}`);
  }

  render() {
    return (
      <div className="gis-login">
        <Button onClick={() => this.signIn("a8002d26-698c-4fdb-a542-775b1cba9d2a")}>
          Sign in as User
        </Button>
        <Button onClick={() => this.signIn("14f797b1-202e-438c-a53c-126c885b24cf")}>
          Sign in as Admin
        </Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
