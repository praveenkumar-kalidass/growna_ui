import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Grid,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import _ from "underscore";
import Routes from "../../../../Utils/Routes";
import {
  getAllPrivileges,
  addRole
} from "../../../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  privileges: state.tenant.privileges
});

const mapDispatchToProps = (dispatch) => ({
  addRole: (data) => { dispatch(addRole(data)) },
  getAllPrivileges: (scope) => { dispatch(getAllPrivileges(scope)) }
});

class RolePrivilegeForm extends Component {
  static propTypes = {
    role: PropTypes.object.isRequired,
    handlePrivilegeForm: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      privileges: [],
      permissions: []
    };
  }

  componentDidMount() {
    this.props.getAllPrivileges("GIS_USER");
  }

  static getDerivedStateFromProps(props) {
    return {
      privileges: _.map(props.privileges, (privilege) => (
        _.extend(privilege, Routes[privilege.description])
      ))
    };
  }

  handleSubmit = () => {
    const {role} = this.props;
    const {permissions} = this.state;
    const data = {
      ...role,
      permissions
    };
    this.props.addRole(data);
    this.props.handlePrivilegeForm();
  }

  handleChange = (event, privilegeId) => {
    let {permissions} = this.state;
    if (event.target.checked) {
      permissions.push(privilegeId);
    } else {
      permissions = _.reject(permissions, (privilege) => (privilege === privilegeId));
    }
    this.setState({permissions});
  }

  render() {
    const {
      privileges
    } = this.state;

    return (
      <Grid container className="gis-role-privilege-form"
        justify="center" alignItems="center">
        <Grid item xs={12} sm={11} md={11}>
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary"
              onClick={this.handleSubmit}
              className="submit-button">
              Submit
            </Button>
          </Grid>
          <Grid container justify="space-around" spacing={4}>
            {
              _.map(privileges, (privilege, index) => (
                <Grid key={index} item xs={12} sm={6} md={4}>
                  <Card>
                    <CardContent>
                      <Grid container justify="space-between">
                        <Grid item>
                          <Grid container alignItems="center">
                            <privilege.icon />
                            &nbsp;
                            <Typography variant="h5" component="h2">
                              {privilege.name}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Checkbox
                            className="privilege-checkbox"
                            color="primary"
                            onChange={(event) => this.handleChange(event, privilege.id)}></Checkbox>
                        </Grid>
                      </Grid>
                      <Typography color="textSecondary">
                        Category: {privilege.category}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RolePrivilegeForm);
