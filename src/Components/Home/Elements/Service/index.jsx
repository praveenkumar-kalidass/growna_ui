import React, {Component} from "react";
import {Avatar, Grid, Paper, Typography} from "@material-ui/core";
import Certified from "../../Assets/gis-certified.jpg";
import Trust from "../../Assets/gis-trust.jpg";
import "./style.scss";

class Service extends Component {
  render() {
    return (
      <Grid className="gis-service" container justify="space-between">
        <Grid item>
          <Grid className="gis-service-container" container alignItems="center" spacing={16}>
            <Grid item>
              <Paper className="service-logo-paper" elevation={1}>
                <Avatar className="service-logo" src={Certified} />
              </Paper>
            </Grid>
            <Grid item>
              <Typography className="service-text service-label" variant="body1" gutterBottom>
                Certified & Licensed by
              </Typography>
              <Typography className="service-text service-info" variant="h6" gutterBottom>
                IRDAI (Reg. No. 157)
              </Typography>
              <Typography className="service-text service-label" variant="body1" gutterBottom>
                Indian Insurance Regulator
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid className="gis-service-container" container alignItems="center" spacing={16}>
            <Grid item>
              <Paper className="service-logo-paper" elevation={1}>
                <Avatar className="service-logo" src={Trust} />
              </Paper>
            </Grid>
            <Grid item>
              <Typography className="service-text service-label" variant="body1" gutterBottom>
                Trusted by
              </Typography>
              <Typography className="service-text service-info" variant="h6" gutterBottom>
                1.3 Crore Indians
              </Typography>
              <Typography className="service-text service-label" variant="body1" gutterBottom>
                for their insurance needs
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid className="gis-service-container" container alignItems="center" spacing={16}>
            <Grid item>
              <Paper className="service-logo-paper" elevation={1}>
                <Avatar className="service-logo" src={Certified} />
              </Paper>
            </Grid>
            <Grid item>
              <Typography className="service-text service-label" variant="body1" gutterBottom>
                Certified & Licensed by
              </Typography>
              <Typography className="service-text service-info" variant="h6" gutterBottom>
                IRDAI (Reg. No. 157)
              </Typography>
              <Typography className="service-text service-label" variant="body1" gutterBottom>
                Indian Insurance Regulator
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Service;
