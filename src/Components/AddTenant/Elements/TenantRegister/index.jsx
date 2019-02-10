import React, {Component} from "react";
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
import "./style.scss";

class TenantRegister extends Component {
  render() {
    return (
      <Grid container className="gis-tenant-register"
        justify="center" alignItems="center">
        <Grid item md="auto">
          <CircularProgress size={40} />
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Card className="register-card">
            <CardContent className="card-content">
              <CheckCircle className="success-icon" />
              <Typography variant="h5" component="h2">
                Tenant Registered successfully !!!
              </Typography>
            </CardContent>
            <CardActions className="card-action">
              <Button variant="contained" color="primary">
                Add more Tenants
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default TenantRegister;
