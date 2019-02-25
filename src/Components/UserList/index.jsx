import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  Chip,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import {
  Create,
  Person
} from "@material-ui/icons";
import {Link} from "react-router-dom";
import Cookies from "universal-cookie";
import _ from "underscore";
import Routes from "../../Utils/Routes";
import {getUsersByTenant} from "../../Actions/Tenant";
import DemoUser from "../../Assets/demo-user.png";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.tenant.loading,
  users: state.tenant.userList
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (tenantId) => { dispatch(getUsersByTenant(tenantId)) }
});

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    const cookies = new Cookies();
    const tenantId = cookies.get("gis").tenantId;
    this.props.getUsers(tenantId);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      users: nextProps.users
    });
  }

  render() {
    const {
      loading,
      users
    } = this.state;

    return (
      <Paper className="gis-user-list">
        <Grid container justify="space-between" alignItems="center">
          <Typography className="list-header" variant="h4" gutterBottom>
            Users
          </Typography>
          <Button color="primary" component={Link} to={Routes.ADD_USER.path}>
            <Routes.ADD_USER.icon />
            Add User
          </Button>
        </Grid>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="dense">Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Manager</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell>Member Since</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              loading &&
              <TableRow>
                <TableCell colSpan={5}>
                  <Grid container justify="center">
                    <CircularProgress />
                  </Grid>
                </TableCell>
              </TableRow>
            }
            {
              !loading && _.map(users, (user) => (
                <TableRow key={user.id}>
                  <TableCell padding="dense">
                    <Grid container alignItems="center">
                      <Avatar alt={user.firstName} src={DemoUser} />
                      <div>
                        <Typography variant="subtitle1">{user.firstName} {user.lastName}</Typography>
                        <Typography>{user.role.name}</Typography>
                      </div>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Chip
                      avatar={<Avatar><Person /></Avatar>}
                      label={`${user.parentId.firstName} ${user.parentId.lastName}`}
                      clickable
                      color="primary"
                      deleteIcon={<Create />}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      avatar={<Avatar><Person /></Avatar>}
                      label={`${user.createdBy.firstName} ${user.createdBy.lastName}`}
                      clickable
                      color="primary"
                      deleteIcon={<Create />}
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toDateString()}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
