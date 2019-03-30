import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {
  Button,
  CircularProgress,
  Grid,
  Hidden,
  IconButton,
  Paper,
  SnackbarContent,
  TextField,
  Typography
} from "@material-ui/core";
import {
  ArrowForward,
  Close
} from "@material-ui/icons";
import Cookies from "universal-cookie";
import _ from "underscore";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Schema from "./schema";
import Routes from "../../Utils/Routes";
import {disableAppError} from "../../Actions/App";
import {login} from "../../Actions/User";
import "./style.scss";

const mapStateToProps = (state) => ({
  error: state.app.error
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials, callback) => { dispatch(login(credentials, callback)) },
  disableAppError: () => { dispatch(disableAppError()) }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      email: Schema.email,
      password: Schema.password
    };
    this.state = {
      email: "",
      password: "",
      isLogin: false,
      error: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      error: nextProps.error,
      isLogin: false
    }, () => {
      if (this.state.error) {
        setTimeout(
          () => {
            this.props.disableAppError();
          },
          5000
        );
      }
    });
  }

  getValidatorData = () => (this.state)

  login = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        this.setState({
          isLogin: true
        });
        this.props.login({
          username: this.state.email,
          password: this.state.password
        }, (data) => {
          const cookies = new Cookies();
          cookies.set("gis", {
            ..._.pick(data.auth,
              "accessToken",
              "refreshToken",
              "userId"
            ),
            tenantId: data.role.tenantId,
            roleId: data.role.id,
            role: data.role.name,
            type: data.role.type
          }, {
            expires: new Date(data.auth.refreshTokenExpiresAt)
          });
          this.props.history.push(Routes.APP.path);
        });
      }
    });
  }

  handleFieldChange = (event, field) => {
    let state = this.state;
    state[field] = event.target.value;
    this.setState(state);
  }

  render() {
    const {
      email,
      password,
      isLogin,
      error
    } = this.state;

    return (
      <Grid container alignItems="stretch" className="gis-login">
        <Grid item xs sm md>
          <Grid container justify="center" alignItems="center"
            className="login-container">
            <Grid item xs={11} sm={10} md={8} className="login-grid">
              <Grid container>
                <Hidden xsDown>
                  <Grid item xs sm md className="login-message-container">
                    <Paper elevation={2} className="login-message-grid">
                      <Grid container alignItems="center" justify="space-around"
                        className="message-grid-container">
                        <Grid item>
                          <Typography variant="h6" gutterBottom>
                            GIS
                          </Typography>
                          <Typography variant="h3" gutterBottom>
                            Hello there,
                          </Typography>
                          <Typography variant="subtitle1" gutterBottom>
                            Welcome to Growna Insurance Service
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Hidden>
                <Grid item xs sm md>
                  <Grid container alignItems="center"
                    className="login-form-grid">
                    <Grid item xs sm md className="login-form">
                      <Paper elevation={1} className="login-form-container">
                        <Grid container>
                          <Grid item xs sm md>
                            <Typography className="login-header"
                              variant="h4" gutterBottom>
                              Login
                            </Typography>
                          </Grid>
                        </Grid>
                        <form autoComplete="off" noValidate onSubmit={this.login}>
                          <Grid container direction="column">
                            <Grid item xs sm md>
                              <TextField
                                required
                                label="Email"
                                type="email"
                                onChange={(event) => this.handleFieldChange(event, "email")}
                                onBlur={this.props.handleValidation("email")}
                                value={email}
                                margin="normal"
                                fullWidth
                                error={!this.props.isValid("email")}
                                helperText={this.props.getValidationMessages("email")[0]}
                                />
                              <TextField
                                required
                                label="Password"
                                type="password"
                                onChange={(event) => this.handleFieldChange(event, "password")}
                                onBlur={this.props.handleValidation("password")}
                                value={password}
                                margin="normal"
                                fullWidth
                                error={!this.props.isValid("password")}
                                helperText={this.props.getValidationMessages("password")[0]}
                                />
                            </Grid>
                            <Grid item xs sm md>
                              <Grid container justify="space-between" alignItems="center">
                                <Grid item>
                                  <Link className="signup-link" to={Routes.SIGNUP.path}>
                                    Signup as a new user
                                  </Link>
                                </Grid>
                                <Grid item>
                                  {
                                    isLogin ?
                                    <Button variant="contained" color="primary"
                                      className="login-button">
                                      <CircularProgress size={24} className="button-progress" />
                                    </Button> :
                                    <Button type="submit" variant="contained"
                                      color="primary" className="login-button">
                                      Login
                                      <ArrowForward className="button-icon" />
                                    </Button>
                                  }
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          {
                            error &&
                            <SnackbarContent
                              className="login-error-message"
                              message={"Login Error!!! Please Check your credentials."} />
                          }
                        </form>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Validation(Strategy)(Login)));
