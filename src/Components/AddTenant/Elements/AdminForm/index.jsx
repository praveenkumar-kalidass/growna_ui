import React, {Component} from "react";
import {
  Button,
  Grid,
  Paper,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Schema from "./schema";
import "./style.scss";

class AdminForm extends Component {
  static propTypes = {
    handleAdminForm: PropTypes.func.isRequired
  };

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
      password: ""
    };
  }

  getValidatorData = () => (this.state)

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    this.props.validate((error) => {
      if (!error) {
        const data = {
          ...this.state,
          createdBy: gis.userId,
          parentId: gis.userId
        };
        this.props.handleAdminForm(data);
      }
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password
    } = this.state;

    return (
      <Grid container className="gis-admin-form"
        justify="center" alignItems="center">
        <Grid item xs={12} sm={10} md={6}>
          <Paper elevation={1} className="admin-form">
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6}>
                  <TextField
                    label="First Name"
                    value={firstName}
                    onChange={(event) => this.handleChange(event, "firstName")}
                    onBlur={this.props.handleValidation("firstName")}
                    margin="normal"
                    fullWidth
                    required
                    autoFocus
                    error={!this.props.isValid("firstName")}
                    helperText={this.props.getValidationMessages("firstName")[0]}
                  />
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
                    helperText={this.props.getValidationMessages("lastName")[0]}
                  />
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
                helperText={this.props.getValidationMessages("email")[0]}
              />
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
                helperText={this.props.getValidationMessages("password")[0]}
              />
              <Button type="submit" className="submit-button"
                variant="contained" color="primary">
                Submit
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Validation(Strategy)(AdminForm);
