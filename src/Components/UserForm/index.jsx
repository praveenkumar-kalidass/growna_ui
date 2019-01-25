import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  Grid,
  MenuItem,
  Paper,
  TextField,
  Typography
} from "@material-ui/core";
import {addUser} from "../../Actions/User";
import "./style.scss";

const mapDispatchToProps = (dispatch) => ({
  addUser: (user) => { dispatch(addUser(user)) }
});

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: ""
    };
  }

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addUser(this.state);
  }

  resetForm = () => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      roleId: ""
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      roleId
    } = this.state;

    return (
      <Paper className="gis-user-form">
        <Typography className="form-header" variant="h4" gutterBottom>
          Add User
        </Typography>
        <Grid container justify="center" className="form-container">
          <Grid item xs={12} sm={10} md={6}>
            <Paper elevation={1} className="user-form">
              <form onSubmit={this.handleSubmit} autoComplete="off">
                <Grid container spacing={16}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="First Name"
                      value={firstName}
                      onChange={(event) => this.handleChange(event, "firstName")}
                      margin="normal"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      label="Last Name"
                      value={lastName}
                      onChange={(event) => this.handleChange(event, "lastName")}
                      margin="normal"
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>
                <TextField
                  label="E-Mail"
                  value={email}
                  type="email"
                  onChange={(event) => this.handleChange(event, "email")}
                  margin="normal"
                  fullWidth
                  required
                />
                <TextField
                  label="Password"
                  value={password}
                  type="password"
                  onChange={(event) => this.handleChange(event, "password")}
                  margin="normal"
                  fullWidth
                  required
                />
                <TextField
                  required
                  select
                  label="Select a role"
                  value={roleId}
                  onChange={(event) => this.handleChange(event, "roleId")}
                  margin="normal"
                  fullWidth>
                  <MenuItem value={"108243ae-d3ff-40db-b4e7-efc2390b5827"}>
                    Administrator
                  </MenuItem>
                  <MenuItem value={"543529bf-f5dc-44ec-a3e7-aaa4721e5640"}>
                    User
                  </MenuItem>
                </TextField>
                <Button type="submit" className="submit-button">
                  Submit
                </Button>
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

export default connect(null, mapDispatchToProps)(UserForm);
