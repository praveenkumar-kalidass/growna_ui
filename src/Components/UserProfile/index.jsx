import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField
} from "@material-ui/core";
import {
  CameraAlt
} from "@material-ui/icons";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Cookies from "universal-cookie";
import Schema from "./schema";
import {
  updateUser,
  updateUserImage
} from "../../Actions/User";
import GifLoader from "../../Assets/loader.gif";
import Config from "../../../config/config";
import "./style.scss";

const environment = process.env.NODE_ENV || "development";

const mapStateToProps = (state) => ({
  loading: !!state.user.loading,
  image: state.user.image,
  user: state.user.user
});

const mapDispatchToProps = (dispatch) => ({
  updateUser: (user) => { dispatch(updateUser(user)) },
  updateUserImage: (userId, image) => { dispatch(updateUserImage(userId, image)) }
});

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      firstName: Schema.firstName,
      lastName: Schema.lastName
    };
    this.state = {
      loading: props.loading,
      image: props.image,
      user: props.user,
      firstName: props.user.firstName || "",
      lastName: props.user.lastName || "",
      email: props.user.email || "",
      password: ""
    };
  }

  static getDerivedStateFromProps(props) {
    if(props.loading) {
      return {
        image: props.image,
        user: props.user,
        firstName: props.user.firstName || "",
        lastName: props.user.lastName || "",
        email: props.user.email || "",
        password: ""
      };
    }
    return {
      loading: props.loading
    };
  }

  getValidatorData = () => (this.state)

  handleChange = (event, field) => {
    this.setState({
      [field]: event.target.value
    });
  }

  handleImage = (event) => {
    const cookies = new Cookies();
    if (event.target.files.length) {
      this.props.updateUserImage(
        cookies.get("gis").userId,
        event.target.files[0]
      );
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.validate((error) => {
      if (!error) {
        const {
          user,
          firstName,
          lastName,
          password
        } = this.state;
        this.props.updateUser({
          ...user,
          firstName,
          lastName,
          password: password || user.password
        });
      }
    });
  }

  render() {
    const {
      loading,
      image,
      user,
      firstName,
      lastName,
      email,
      password
    } = this.state;

    return (
      <Paper className="gis-user-profile">
        <Grid container justify="space-around">
          <Grid item xs sm md>
            {
              image.path &&
              <Grid container justify="center">
                <Grid item>
                  <div className="image-container">
                    {
                      loading ?
                      <Avatar className="user-image" src={GifLoader} /> :
                      <Avatar
                        className="user-image"
                        src={`${Config[environment].service}${image.path}?${new Date().getTime()}`}></Avatar>
                    }
                    <Grid container justify="center" className="upload-image">
                      <input id="profile-picture"
                        accept="image/*"
                        type="file"
                        style={{display: "none"}}
                        onChange={this.handleImage} />
                      <label htmlFor="profile-picture">
                        <Button component="span" className="upload-label">
                          <CameraAlt className="upload-icon" />
                          Change picture
                        </Button>
                      </label>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            }
          </Grid>
          <Grid item xs={12} sm={10} md={8}>
            <form onSubmit={this.handleSubmit}>
              <Grid container spacing={4}>
                <Grid item xs sm md>
                  <TextField
                    value={firstName}
                    margin="normal"
                    fullWidth
                    required
                    onChange={(event) => this.handleChange(event, "firstName")}
                    onBlur={this.props.handleValidation("firstName")}
                    error={!this.props.isValid("firstName")}
                    helperText={this.props.getValidationMessages("firstName")[0] || "First Name"} />
                </Grid>
                <Grid item xs sm md>
                  <TextField
                    value={lastName}
                    margin="normal"
                    fullWidth
                    onChange={(event) => this.handleChange(event, "lastName")}
                    onBlur={this.props.handleValidation("lastName")}
                    error={!this.props.isValid("lastName")}
                    helperText={this.props.getValidationMessages("lastName")[0] || "Last Name"} />
                </Grid>
              </Grid>
              <TextField
                value={email}
                margin="normal"
                fullWidth
                disabled
                onChange={(event) => this.handleChange(event, "email")}
                helperText="Email" />
              <TextField
                value={password}
                margin="normal"
                fullWidth
                onChange={(event) => this.handleChange(event, "password")}
                helperText="New password" />
              <Grid container justify="flex-end">
                {
                  loading ?
                  <Button variant="contained" color="primary">
                    <CircularProgress size={24} className="button-progress" />
                  </Button> :
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                }
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation(Strategy)(UserProfile));
