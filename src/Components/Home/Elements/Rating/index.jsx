import React, {Component} from "react";
import {Avatar, Badge, Grid, Paper, Typography} from "@material-ui/core";
import Certified from "../../Assets/gis-certified.jpg";
import Trust from "../../Assets/gis-trust.jpg";
import Google from "../../Assets/google-logo.png";
import Facebook from "../../Assets/facebook-logo.png";
import "./style.scss";

class Rating extends Component {
  render() {
    return (
      <Grid className="gis-rating" container justify="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container justify="space-between">
            <Grid item md={4} xs={12}>
              <Grid className="gis-rating-container" container
                justify="center" alignItems="center" spacing={16}>
                <Grid item>
                  <Paper className="rating-logo-paper" elevation={1}>
                    <Avatar className="rating-logo" src={Certified} />
                  </Paper>
                </Grid>
                <Grid item>
                  <Typography className="rating-text rating-label" variant="body1" gutterBottom>
                    Certified & Licensed by
                  </Typography>
                  <Typography className="rating-text rating-info" variant="h6" gutterBottom>
                    IRDAI (Reg. No. 157)
                  </Typography>
                  <Typography className="rating-text rating-label" variant="body1" gutterBottom>
                    Indian Insurance Regulator
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid className="gis-rating-container" container
                justify="center" alignItems="center" spacing={16}>
                <Grid item>
                  <Paper className="rating-logo-paper" elevation={1}>
                    <Avatar className="rating-logo" src={Trust} />
                  </Paper>
                </Grid>
                <Grid item>
                  <Typography className="rating-text rating-label" variant="body1" gutterBottom>
                    Trusted by
                  </Typography>
                  <Typography className="rating-text rating-info" variant="h6" gutterBottom>
                    1.3 Crore Indians
                  </Typography>
                  <Typography className="rating-text rating-label" variant="body1" gutterBottom>
                    for their insurance needs
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={4} xs={12}>
              <Grid className="gis-rating-container" container
                justify="center" alignItems="center" spacing={16}>
                <Grid item>
                  <Paper className="social-logo-paper" elevation={1}>
                    <Grid className="logo-container" container
                      justify="space-around" alignItems="center">
                      <Grid item>
                        <Badge badgeContent={4.5} color="primary">
                          <Avatar className="logo-avatar" src={Google} />
                        </Badge>
                      </Grid>
                      <Grid item>
                        <Badge badgeContent={3.6} color="primary">
                          <Avatar className="logo-avatar" src={Facebook} />
                        </Badge>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item>
                  <Typography className="rating-text rating-label" variant="body1" gutterBottom>
                    Rated Highly,
                  </Typography>
                  <Typography className="rating-text rating-info" variant="h6" gutterBottom>
                    95% ratings
                  </Typography>
                  <Typography className="rating-text rating-label" variant="body1" gutterBottom>
                    by Happy Customers
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Rating;
