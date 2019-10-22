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
  loading: !!state.tenant.loading
});

class TenantRegister extends Component {
  static propTypes = {
    addMoreTenant: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      loading: props.loading
    };
  }

  render() {
    const {
      loading
    } = this.state;

    return (
      <Grid container className="gis-tenant-register"
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
                  Tenant Registered successfully !!!
                </Typography>
              </CardContent>
              <CardActions className="card-action">
                <Button variant="contained" color="primary"
                  onClick={this.props.addMoreTenant}>
                  Add more Tenants
                </Button>
              </CardActions>
            </Card>
          </Grid>
        }
      </Grid>
    );
  }
}

export default connect(mapStateToProps)(TenantRegister);
