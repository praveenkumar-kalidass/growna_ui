import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Hidden,
  IconButton,
  Paper,
  SnackbarContent,
  TextField,
  Typography
} from "@material-ui/core";
import {
  ArrowForward
} from "@material-ui/icons";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import _ from "underscore";
import Schema from "./schema";
import Routes from "../../Utils/Routes";
import {signupUser} from "../../Actions/User";
import {disableAppError} from "../../Actions/App";
import "./style.scss";

const mapStateToProps = (state) => ({
  error: state.app.error
});

const mapDispatchToProps = (dispatch) => ({
  signupUser: (data, callback) => { dispatch(signupUser(data, callback)) },
  disableAppError: () => { dispatch(disableAppError()) }
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      firstName: Schema.firstName,
      lastName: Schema.lastName,
      email: Schema.email,
      password: Schema.password
    };
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      isSignup: false,
      login: false,
      error: false
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.error) {
      setTimeout(props.disableAppError, 5000);
    }
    return {
      error: props.error,
      isSignup: false
    };
  }

  getValidatorData = () => (this.state)

  handleChange = (event, field) => {
    let state = this.state;
    state[field] = event.target.value;
    this.setState(state);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        this.setState({
          isSignup: true
        });
        this.props.signupUser({
          ..._.pick(
            this.state,
            "firstName",
            "lastName",
            "email",
            "password"
          )
        }, (data) => {
          this.setState({
            login: true
          });
        });
      }
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      isSignup,
      login,
      error
    } = this.state;

    return (
      <Grid container alignItems="stretch" className="gis-signup">
        <Grid item xs sm md>
          <Grid container justify="center" alignItems="center"
            className="signup-container">
            <Grid item xs={11} sm={10} md={8} className="signup-grid">
              <Grid container>
                <Hidden xsDown>
                  <Grid item xs sm md className="signup-message-container">
                    <Paper elevation={2} className="signup-message-grid">
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
                            Welcome to No.1 Insurance Service
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Hidden>
                <Grid item xs sm md>
                  <Grid container alignItems="center"
                    className="signup-form-grid">
                    <Grid item xs sm md className="signup-form">
                      <Paper elevation={1} className="signup-form-container">
                        <Grid container>
                          <Grid item xs sm md>
                            <Typography className="signup-header"
                              variant="h4" gutterBottom>
                              Signup
                            </Typography>
                          </Grid>
                        </Grid>
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                          <Grid container spacing={16}>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(event) => this.handleChange(event, "firstName")}
                                onBlur={this.props.handleValidation("firstName")}
                                margin="normal"
                                fullWidth
                                required
                                error={!this.props.isValid("firstName")}
                                helperText={this.props.getValidationMessages("firstName")[0]} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                              <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(event) => this.handleChange(event, "lastName")}
                                onBlur={this.props.handleValidation("lastName")}
                                margin="normal"
                                fullWidth
                                required
                                error={!this.props.isValid("lastName")}
                                helperText={this.props.getValidationMessages("lastName")[0]} />
                            </Grid>
                          </Grid>
                          <TextField
                            label="E-Mail"
                            value={email}
                            type="email"
                            onChange={(event) => this.handleChange(event, "email")}
                            onBlur={this.props.handleValidation("email")}
                            margin="normal"
                            fullWidth
                            required
                            error={!this.props.isValid("email")}
                            helperText={this.props.getValidationMessages("email")[0]} />
                          <TextField
                            label="Password"
                            value={password}
                            type="password"
                            onChange={(event) => this.handleChange(event, "password")}
                            onBlur={this.props.handleValidation("password")}
                            margin="normal"
                            fullWidth
                            required
                            error={!this.props.isValid("password")}
                            helperText={this.props.getValidationMessages("password")[0]} />
                          <Grid container justify="space-between" alignItems="center">
                            <Grid item>
                              <Link className="login-link" to={Routes.LOGIN.path}>
                                Login if you are Existing User
                              </Link>
                            </Grid>
                            <Grid item>
                              {
                                isSignup ?
                                <Button variant="contained" color="primary"
                                  className="signup-button">
                                  <CircularProgress size={24} className="button-progress" />
                                </Button> :
                                <Button type="submit" variant="contained"
                                  color="primary" className="signup-button">
                                  Signup
                                  <ArrowForward className="button-icon" />
                                </Button>
                              }
                            </Grid>
                          </Grid>
                          {
                            error &&
                            <SnackbarContent
                              className="signup-error-message"
                              message={"Signup Error!!! Did you signup earlier?"} />
                          }
                        </form>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Dialog open={login}>
            <DialogContent>
              <DialogContentText>
                Signup Complete. Login to use No.1 Insurance.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button component={Link} to={Routes.LOGIN.path}
                variant="contained" color="primary">
                Go to Login
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation(Strategy)(Signup)));
