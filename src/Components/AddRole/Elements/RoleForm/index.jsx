import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import _ from "underscore";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Schema from "./schema";
import Routes from "../../../../Utils/Routes";
import {getRoles} from "../../../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.tenant.loading,
  roles: state.tenant.roles
});

const mapDispatchToProps = (dispatch) => ({
  getRoles: (tenantId) => { dispatch(getRoles(tenantId)) }
});

class RoleForm extends Component {
  static propTypes = {
    handleRoleForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.validatorTypes = {
      name: Schema.name,
      parentId: Schema.parentId
    };
    this.state = {
      name: "",
      parentId: "",
      openParent: false,
      loading: false,
      roles: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      roles: nextProps.roles
    });
  }

  getValidatorData = () => (this.state)

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  }

  loadRoles = () => {
    const cookies = new Cookies();
    this.props.getRoles(cookies.get("gis").tenantId);
    this.handleState("openParent", true);
  }

  handleState = (key, value) => {
    this.setState({
      [key]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    this.props.validate((error) => {
      if (!error) {
        this.props.handleRoleForm({
          name: this.state.name,
          type: gis.type,
          parentId: this.state.parentId,
          tenantId: gis.tenantId
        });
      }
    });
  }

  resetForm = () => {
    this.props.clearValidations();
    this.setState({
      name: "",
      parentId: ""
    });
  }

  render() {
    const {
      name,
      parentId,
      openParent,
      loading,
      roles
    } = this.state;

    return (
      <Grid container justify="center" alignItems="center"
        className="gis-role-form">
        <Grid item xs={12} sm={10} md={6}>
          <Paper elevation={1} className="role-form">
            <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
              <TextField
                label="Role"
                value={name}
                onChange={(event) => this.handleChange(event, "name")}
                onBlur={this.props.handleValidation("name")}
                margin="normal"
                fullWidth
                required
                error={!this.props.isValid("name")}
                helperText={this.props.getValidationMessages("name")[0]}
              />
              <TextField
                required
                select
                label="Select a manager"
                value={parentId}
                onChange={(event) => this.handleChange(event, "parentId")}
                onBlur={this.props.handleValidation("parentId")}
                SelectProps={{
                  open: openParent,
                  onOpen: (event) => this.loadRoles(),
                  onClose: () => this.handleState("openParent", false)
                }}
                margin="normal"
                fullWidth
                error={!this.props.isValid("parentId")}
                helperText={this.props.getValidationMessages("parentId")[0]}>
                {
                  loading &&
                  <MenuItem>
                    <CircularProgress size={20} />
                  </MenuItem>
                }
                {
                  !loading && _.map(roles, (role, index) => (
                    <MenuItem key={index} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))
                }
              </TextField>
              <Button type="submit" className="submit-button"
                variant="contained" color="primary">
                Submit
              </Button>
              <Button className="reset-button" onClick={this.resetForm}>
                Reset
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation(Strategy)(RoleForm));
