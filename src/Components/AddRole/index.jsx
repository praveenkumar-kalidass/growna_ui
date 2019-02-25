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
  addRole,
  getRoles
} from "../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.tenant.loading,
  roles: state.tenant.roles,
  success: state.app.success
});

const mapDispatchToProps = (dispatch) => ({
  addRole: (role) => { dispatch(addRole(role)) },
  getRoles: (tenantId) => { dispatch(getRoles(tenantId)) }
});

class AddRole extends Component {
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
      roles: [],
      addRole: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({
        name: "",
        parentId: "",
        addRole: false
      });
    }
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
        this.handleState("addRole", true);
        const data = {
          ..._.pick(this.state,
            "name",
            "parentId"
          ),
          type: gis.type,
          tenantId: gis.tenantId
        };
        this.props.addRole(data);
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
      roles,
      addRole
    } = this.state;

    return (
      <Paper className="gis-add-role">
        <Grid container justify="space-between" alignItems="center">
          <Typography className="form-header" variant="h4" gutterBottom>
            Add Role
          </Typography>
          <Button color="primary" component={Link} to={Routes.ROLE_LIST.path}>
            <Routes.ROLE_LIST.icon />
            Role List
          </Button>
        </Grid>
        <Grid container justify="center" alignItems="center"
          className="form-container">
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
                    _.map(roles, (role, index) => (
                      <MenuItem key={index} value={role.id}>
                        {role.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
                {
                  !addRole &&
                  <Button type="submit" className="submit-button"
                    variant="contained" color="primary">
                    Submit
                  </Button>
                }
                {
                  addRole &&
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
)(Validation(Strategy)(AddRole));
