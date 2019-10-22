import React, {Component} from "react";
import {connect} from "react-redux";
import {
  AppBar,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  Delete
} from "@material-ui/icons";
import Cookies from "universal-cookie";
import {Link} from "react-router-dom";
import _ from "underscore";
import Routes from "../../Utils/Routes";
import {
  getRole,
  getRoles
} from "../../Actions/Tenant";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: !!state.tenant.loading,
  role: state.tenant.role,
  roles: state.tenant.roles
});

const mapDispatchToProps = (dispatch) => ({
  getRole: (id) => { dispatch(getRole(id)) },
  getRoles: (tenantId) => { dispatch(getRoles(tenantId)) }
});

class EditRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      id: "",
      name: "",
      parentId: "",
      roles: [],
      privileges: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    this.props.getRoles(cookies.get("gis").tenantId);
    this.props.getRole(this.props.match.params.id);
  }

  static getDerivedStateFromProps(props) {
    return {
      id: props.role.id || "",
      name: props.role.name || "",
      parentId: props.role.parentId || "",
      loading: props.loading,
      roles: props.roles,
      privileges: _.map(props.role.privileges || [], (privilege) => (
        Routes[privilege.description]
      ))
    };
  }

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  }

  render() {
    const {
      loading,
      id,
      name,
      parentId,
      roles,
      privileges
    } = this.state;

    return (
      <Paper className="gis-edit-role">
        <Grid container justify="space-between" alignItems="center">
          <Typography className="page-header" variant="h4" gutterBottom>
            Manage Role
          </Typography>
          <Button color="primary" component={Link} to={Routes.ROLE_LIST.path}>
            <Routes.ROLE_LIST.icon />
            Back to Role List
          </Button>
        </Grid>
        {
          !loading &&
          <AppBar className="role-detail-toolbar" position="static">
            <Toolbar variant="dense">
              <Grid container justify="space-between"
                alignItems="center">
                <Grid item>
                  <Typography variant="h6" color="inherit">
                    Role: {name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid container alignItems="center" spacing={16}>
                    <Grid item>
                      <Typography variant="caption" color="inherit">
                        Reporting to:
                      </Typography>
                    </Grid>
                    <Grid item>
                      <TextField
                        className="role-manager-select"
                        select
                        value={parentId}
                        onChange={(event) => this.handleChange(event, "parentId")}
                        margin="dense"
                        variant="outlined">
                        {
                          _.map(roles, (role, index) => (
                            <MenuItem key={index} value={role.id}>
                              {role.name}
                            </MenuItem>
                          ))
                        }
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
        }
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="dense"></TableCell>
              <TableCell>Privilege</TableCell>
              <TableCell>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading &&
              <TableRow>
                <TableCell colSpan={4}>
                  <Grid container justify="center">
                    <CircularProgress />
                  </Grid>
                </TableCell>
              </TableRow>
            }
            {
              !loading && _.map(privileges, (privilege, index) => (
                <TableRow key={index}>
                  <TableCell padding="dense">
                    <privilege.icon />
                  </TableCell>
                  <TableCell>
                    {privilege.name}
                  </TableCell>
                  <TableCell>
                    {privilege.category}
                  </TableCell>
                  <TableCell>
                    <Delete />
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
