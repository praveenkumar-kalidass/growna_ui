import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import {Link} from "react-router-dom";
import Routes from "../../Utils/Routes";
import Cookies from "universal-cookie";
import _ from "underscore";
import {getRoleDetails} from "../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: !!state.tenant.loading,
  roles: state.tenant.roleList
});

const mapDispatchToProps = (dispatch) => ({
  getRoles: (tenantId) => dispatch(getRoleDetails(tenantId))
});

class RoleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      roles: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.props.getRoles(cookies.get("gis").tenantId);
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading,
      roles: props.roles
    };
  }

  render() {
    const {
      loading,
      roles
    } = this.state;

    return (
      <Paper className="gis-role-list">
        <Grid container justify="space-between" alignItems="center">
          <Typography className="list-header" variant="h4" gutterBottom>
            Roles
          </Typography>
          <Button color="primary" component={Link} to={Routes.ADD_ROLE.path}>
            <Routes.ADD_ROLE.icon />
            Add Role
          </Button>
        </Grid>
        {
          loading &&
          <Grid container justify="center">
            <CircularProgress />
          </Grid>
        }
        <Grid container justify="space-around" spacing={16}
          className="role-container">
          {
            !loading && _.map(roles, (role, index) => (
              <Grid item key={role.id} md={4}>
                <Card>
                  <CardContent>
                    <Grid container direction="column"
                      justify="center" alignItems="center">
                      <Typography variant="h6" gutterBottom>
                        {role.name}
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom>
                        {new Date(role.createdAt).toDateString()}
                      </Typography>
                      <Button variant="outlined" color="primary"
                        component={Link} to={Routes.EDIT_ROLE.path.replace(":id", role.id)}
                        disabled={role.name === "GIS_ADMIN"}>
                        Manage role
                      </Button>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Grid container justify="space-around" alignItems="center">
                      <Typography variant="subtitle2">
                        Reporting to:
                      </Typography>
                      <Chip
                        color="primary"
                        label={role.parentId.name}></Chip>
                    </Grid>
                  </CardActions>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
