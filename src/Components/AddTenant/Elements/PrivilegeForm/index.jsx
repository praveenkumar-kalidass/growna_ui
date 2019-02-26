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
  registerTenant
} from "../../../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  privileges: state.tenant.privileges
});

const mapDispatchToProps = (dispatch) => ({
  registerTenant: (data) => { dispatch(registerTenant(data)) },
  getAllPrivileges: () => { dispatch(getAllPrivileges()) }
});

class PrivilegeForm extends Component {
  static propTypes = {
    tenantName: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
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
    this.props.getAllPrivileges();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      privileges: _.map(nextProps.privileges, (privilege) => (
        _.extend(privilege, Routes[privilege.description])
      ))
    });
  }

  handleSubmit = () => {
    const {tenantName, user} = this.props;
    const {permissions} = this.state;
    const data = {
      tenantName,
      ...user,
      permissions
    };
    this.props.registerTenant(data);
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
      <Grid container className="gis-privilege-form"
        justify="center" alignItems="center">
        <Grid item xs={12} sm={11} md={11}>
          <Grid container justify="flex-end">
            <Button variant="contained" color="primary"
              onClick={this.handleSubmit}
              className="submit-button">
              Submit
            </Button>
          </Grid>
          <Grid container justify="space-around" spacing={16}>
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

export default connect(mapStateToProps, mapDispatchToProps)(PrivilegeForm);
