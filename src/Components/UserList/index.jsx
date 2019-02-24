import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Avatar,
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
import Cookies from "universal-cookie";
import _ from "underscore";
import {getUsers} from "../../Actions/Tenant";
import DemoUser from "../../Assets/demo-user.png";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.tenant.loading,
  users: state.tenant.users
});

const mapDispatchToProps = (dispatch) => ({
  getUsers: (tenantId) => { dispatch(getUsers(tenantId)) }
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
        <Typography className="list-header" variant="h4" gutterBottom>
          Users
        </Typography>
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
              _.map(users, (user) => (
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
