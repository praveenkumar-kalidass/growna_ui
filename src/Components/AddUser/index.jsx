import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
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
import _ from "underscore";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Schema from "./schema";
import Routes from "../../Utils/Routes";
import {
  addUser,
  getRoles,
  getUsersByRole
} from "../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: !!state.tenant.loading,
  roles: state.tenant.roles,
  managers: state.tenant.users,
  success: state.app.success
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => { dispatch(addUser(user)) },
  getRoles: (tenantId) => { dispatch(getRoles(tenantId)) },
  getManagers: (roleId) => { dispatch(getUsersByRole(roleId)) }
});

class AddUser extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      firstName: Schema.firstName,
      lastName: Schema.lastName,
      email: Schema.email,
      password: Schema.password,
      roleId: Schema.roleId,
      parentId: Schema.parentId
    };
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: "",
      parentId: "",
      openRole: false,
      openParent: false,
      loading: false,
      roles: [],
      managers: [],
      addUser: false
    };
  }

  static getDerivedStateFromProps(props) {
    if (props.success) {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        roleId: "",
        parentId: "",
        addUser: false
      };
    }
    return {
      loading: props.loading,
      roles: props.roles,
      managers: props.managers
    };
  }

  getValidatorData = () => (this.state)

  handleChange = (event, field) => {
    if (field === "roleId") {
      this.handleState("parentId", "");
    }
    this.setState({
      [field]: event.target.value
    });
  }

  loadRoles = () => {
    const cookies = new Cookies();
    this.props.getRoles(cookies.get("gis").tenantId);
    this.handleState("openRole", true);
  }

  loadManagers = () => {
    this.handleState("openParent", true);
    const role = _.findWhere(this.state.roles, {
      id: this.state.roleId
    });
    this.props.getManagers(role.parentId);
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
        this.handleState("addUser", true);
        const data = {
          ..._.pick(this.state,
            "firstName",
            "lastName",
            "email",
            "password",
            "roleId",
            "parentId"
          ),
          createdBy: gis.userId,
          tenantId: gis.tenantId
        };
        this.props.addUser(data);
      }
    });
  }

  resetForm = () => {
    this.props.clearValidations();
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: "",
      parentId: ""
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId,
      parentId,
      openRole,
      openParent,
      loading,
      roles,
      managers,
      addUser
    } = this.state;

    return (
      <Paper className="gis-user-form">
        <Grid container justify="space-between" alignItems="center">
          <Typography className="form-header" variant="h4" gutterBottom>
            Add User
          </Typography>
          <Button color="primary" component={Link} to={Routes.USER_LIST.path}>
            <Routes.USER_LIST.icon />
            User List
          </Button>
        </Grid>
        <Grid container justify="center" alignItems="center"
          className="form-container">
          <Grid item xs={12} sm={10} md={6}>
            <Paper elevation={1} className="user-form">
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
                  SelectProps={{
                    open: openRole,
                    onOpen: (event) => this.loadRoles(),
                    onClose: () => this.handleState("openRole", false)
                  }}
                  margin="normal"
                  fullWidth
                  error={!this.props.isValid("roleId")}
                  helperText={this.props.getValidationMessages("roleId")[0]}>
                  {
                    loading &&
                    <MenuItem>
                      <CircularProgress size={20} />
                    </MenuItem>
                  }
                  {
                    _.map(roles, (role, index) => (
                      <MenuItem key={index} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
                <TextField
                  disabled={!roleId}
                  required
                  select
                  label="Select a Manager for the user"
                  value={parentId}
                  onChange={(event) => this.handleChange(event, "parentId")}
                  onBlur={this.props.handleValidation("parentId")}
                  SelectProps={{
                    open: openParent,
                    onOpen: (event) => this.loadManagers(),
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
                    _.map(managers, (manager, index) => (
                      <MenuItem key={index} value={manager.id}>
                        {manager.firstName}&nbsp;{manager.lastName}
                      </MenuItem>
                    ))
                  }
                </TextField>
                {
                  !addUser &&
                  <Button type="submit" className="submit-button"
                    variant="contained" color="primary">
                    Submit
                  </Button>
                }
                {
                  addUser &&
                  <Button variant="contained" color="primary"
                    className="submit-button">
                    <CircularProgress size={16} className="submit-progress" />
                  </Button>
                }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation(Strategy)(AddUser));
