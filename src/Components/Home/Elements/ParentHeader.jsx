import React, {Component} from "react";
import {AppBar, Button, Grid, Toolbar, Typography} from "@material-ui/core";
import {Phone} from "@material-ui/icons";

class ParentHeader extends Component {
  render() {
    return (
      <AppBar className="home-parent-header" position="static" color="default">
        <Toolbar className="toolbar">
          <Grid container justify="center">
            <Grid item md={10}>
              <Grid container alignItems="center">
                <Grid item md={4}>
                  <Typography variant="h6" color="inherit">
                    Insurance UI
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Grid container justify="space-between">
                    <Grid item>
                      <div className="header-badge">
                        <Grid container justify="center"
                          direction="row" alignItems="center">
                          <div className="badge-icon">
                            <Phone />
                          </div>
                          <div className="badge-info">
                            <p className="info-holder">234123412341234</p>
                            <p className="info-label">Phone Number</p>
                          </div>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="badge-divider"></div>
                    </Grid>
                    <Grid item>
                      <div className="header-badge">
                        <Grid container justify="center"
                          direction="row" alignItems="center">
                          <div className="badge-icon">
                            <Phone />
                          </div>
                          <div className="badge-info">
                            <p className="info-holder">234123412341234</p>
                            <p className="info-label">Phone Number</p>
                          </div>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item>
                      <div className="badge-divider"></div>
                    </Grid>
                    <Grid item>
                      <div className="header-badge">
                        <Grid container justify="center"
                          direction="row" alignItems="center">
                          <div className="badge-icon">
                            <Phone />
                          </div>
                          <div className="badge-info">
                            <p className="info-holder">234123412341234</p>
                            <p className="info-label">Phone Number</p>
                          </div>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid item>
                      <Grid className="get-quote-container" container direction="row"
                        justify="center" alignItems="center">
                        <Grid item>
                          <Button variant="contained" size="large" color="primary">
                            Get a Quote
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ParentHeader;
