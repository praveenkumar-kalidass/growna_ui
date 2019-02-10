import React, {Component} from "react";
import {
  Button,
  Grid,
  Paper,
  TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Schema from "./schema";
import "./style.scss";

class TenantForm extends Component {
  static propTypes = {
    handleTenantForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.validatorTypes = {
      name: Schema.name
    };
    this.state = {
      name: ""
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
        this.props.handleTenantForm(this.state.name);
      }
    });
  }

  render() {
    const {
      name
    } = this.state;

    return (
      <Grid container className="gis-tenant-form"
        justify="center" alignItems="center">
        <Grid item xs={12} sm={10} md={6}>
          <Paper elevation={1} className="tenant-form">
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <TextField
                label="Tenant Name"
                value={name}
                onChange={(event) => this.handleChange(event, "name")}
                onBlur={this.props.handleValidation("name")}
                margin="normal"
                fullWidth
                required
                error={!this.props.isValid("name")}
                helperText={this.props.getValidationMessages("name")[0]}
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

export default Validation(Strategy)(TenantForm);
