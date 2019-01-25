import React, {Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
  Button,
  CircularProgress,
  Grid,
  Hidden,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import {ArrowForward} from "@material-ui/icons";
import Cookies from "universal-cookie";
import _ from "underscore";
import Routes from "../../Utils/Routes";
import {login} from "../../Actions/User";
import "./style.scss";

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  role: state.user.role
});

const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => { dispatch(login(credentials)) }
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      login: false
    };
  }

  login = (event) => {
    event.preventDefault();
    this.setState({
      login: true
    });
    this.props.login(_.pick(this.state, "username", "password"));
  }

  componentWillReceiveProps(nextProps) {
    const cookies = new Cookies();
    cookies.set("gis", {
      ..._.pick(nextProps.auth,
        "accessToken",
        "refreshToken",
        "userId"
      ),
      role: nextProps.role.name
    }, {
      expires: new Date(nextProps.auth.refreshTokenExpiresAt)
    });
    this.props.history.push(Routes.APP);
  }

  handleFieldChange = (event, field) => {
    let state = this.state;
    state[field] = event.target.value;
    this.setState(state);
  }

  render() {
    const {
      username,
      password,
      login
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
                        <form noValidate autoComplete="off" onSubmit={this.login}>
                          <Grid container direction="column">
                            <Grid item xs sm md>
                                <TextField
                                  required
                                  label="Email"
                                  type="email"
                                  onChange={(event) => this.handleFieldChange(event, "username")}
                                  value={username}
                                  margin="normal"
                                  fullWidth
                                  />
                                <TextField
                                  required
                                  label="Password"
                                  type="password"
                                  onChange={(event) => this.handleFieldChange(event, "password")}
                                  value={password}
                                  margin="normal"
                                  fullWidth
                                  />
                            </Grid>
                            <Grid item xs sm md>
                              <Grid container justify="flex-end">
                                <Grid item>
                                  {
                                    login &&
                                    <Button variant="contained" className="login-button">
                                      <CircularProgress size={16} className="button-progress" />
                                    </Button>
                                  }
                                  {
                                    !login &&
                                    <Button type="submit" variant="contained"
                                      className="login-button">
                                      Login
                                      <ArrowForward className="button-icon" />
                                    </Button>
                                  }
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
