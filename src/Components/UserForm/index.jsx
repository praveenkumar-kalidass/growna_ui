import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Schema from "./schema";
import {addUser} from "../../Actions/User";
import "./style.scss";

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => { dispatch(addUser(user)) }
});

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      firstName: Schema.firstName,
      lastName: Schema.lastName,
      email: Schema.email,
      password: Schema.password,
      roleId: Schema.roleId
    };
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: ""
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
    this.props.validate((error) => {
      if (!error) {
        this.props.addUser(this.state);
      }
    });
  }

  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: ""
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId
    } = this.state;

    return (
      <Paper className="gis-user-form">
        <Typography className="form-header" variant="h4" gutterBottom>
          Add User
        </Typography>
        <Grid container justify="center" className="form-container">
          <Grid item xs={12} sm={10} md={6}>
            <Paper elevation={1} className="user-form">
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
                <TextField
                  required
                  select
                  label="Select a role"
                  value={roleId}
                  onChange={(event) => this.handleChange(event, "roleId")}
                  onBlur={this.props.handleValidation("roleId")}
                  margin="normal"
                  fullWidth
                  error={!this.props.isValid("roleId")}
                  helperText={this.props.getValidationMessages("roleId")[0]}>
                  <MenuItem value={"108243ae-d3ff-40db-b4e7-efc2390b5827"}>
                    Administrator
                  </MenuItem>
                  <MenuItem value={"543529bf-f5dc-44ec-a3e7-aaa4721e5640"}>
                    User
                  </MenuItem>
                </TextField>
                <Button type="submit" className="submit-button">
                  Submit
                </Button>
                <Button className="reset-button" onClick={this.resetForm}>
                  Reset
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(null, mapDispatchToProps)(Validation(Strategy)(UserForm));
