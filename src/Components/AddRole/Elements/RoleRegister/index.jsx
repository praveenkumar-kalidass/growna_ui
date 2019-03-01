import React, {Component} from "react";
import {connect} from "react-redux";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from "@material-ui/core";
import {
  CheckCircle
} from "@material-ui/icons";
import PropTypes from "prop-types";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.tenant.loading
});

class RoleRegister extends Component {
  static propTypes = {
    addMoreRole: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading
    });
  }

  render() {
    const {
      loading
    } = this.state;

    return (
      <Grid container className="gis-role-register"
        justify="center" alignItems="center">
        {
          loading &&
          <Grid item md="auto">
            <CircularProgress size={40} />
          </Grid>
        }
        {
          !loading &&
          <Grid item xs={12} sm={10} md={6}>
            <Card className="register-card">
              <CardContent className="card-content">
                <CheckCircle className="success-icon" />
                <Typography variant="h5" component="h2">
                  Role Added successfully !!!
                </Typography>
              </CardContent>
              <CardActions className="card-action">
                <Button variant="contained" color="primary"
                  onClick={this.props.addMoreRole}>
                  Add more Roles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(RoleRegister);
