import React, {Component} from "react";
import PropTypes from "prop-types";
import {AppBar, Button, Divider, Grid, Modal, Paper, TextField, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import Routes from "../../../../Utils/Routes";
import GisLogo from "../../../../Assets/growna-logo.png";
import "./style.scss";

class Header extends Component {
  static propTypes = {
    handleRoute: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showClaim: false
    };
  }

  raiseClaim = () => {
    this.setState({
      showClaim: true
    });
  }

  closeClaim = () => {
    this.setState({
      showClaim: false
    });
  }

  render() {
    const {showClaim} = this.state;

    return (
      <AppBar className="gis-home-header" position="fixed">
        <Toolbar className="home-toolbar" variant="dense">
          <Grid container justify="center">
            <Grid item md={8} sm={10} xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <img onClick={() => this.props.handleRoute(0)}
                    src={GisLogo} className="gis-logo" />
                </Grid>
                <Grid item>
                  <Grid container justify="flex-end" spacing={16}>
                    <Button onClick={() => this.props.handleRoute(0)}
                      className="home-link-button">
                      Insurance
                    </Button>
                    <Button onClick={this.raiseClaim}
                      className="home-link-button">
                      Claims
                    </Button>
                    <Button onClick={() => this.props.handleRoute(5)}
                      className="home-link-button">
                      Contact Us
                    </Button>
                    <Button onClick={() => this.props.handleRoute(4)}
                      className="home-link-button">
                      About Us
                    </Button>
                    <Button href={`#${Routes.LOGIN.path}`} className="home-link-button">
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Modal open={showClaim} onClose={this.closeClaim} disablePortal>
            <Grid container className="claim-request-modal"
              justify="center" alignItems="center">
              <Grid item md={8} sm={10} xs={11}>
                <Grid container justify="center" className="claim-request-container">
                  <Grid item md={12} sm={12} xs={12}>
                    <Typography variant="h6">
                      Submit Claim Request
                    </Typography>
                  </Grid>
                  <Grid item md={8} sm={10} xs={12}>
                    <TextField
                      label="What is this claim for"
                      placeholder="e.g. claim request for bike number 1234"
                      variant="outlined"
                      autoFocus
                      fullWidth />
                  </Grid>
                  <Grid item md={8} sm={10} xs={12}>
                    <TextField
                      label="Tell us what happened"
                      placeholder="Please enter the details"
                      variant="outlined"
                      rows="4"
                      multiline
                      fullWidth />
                  </Grid>
                  <Grid item md={8} sm={10} xs={12}>
                    <TextField
                      label="Please provide your mobile number"
                      placeholder="Enter your mobile number"
                      variant="outlined"
                      fullWidth />
                  </Grid>
                  <Grid item md={8} sm={10} xs={12}>
                    <Button variant="contained" color="primary">
                      Register Claim
                    </Button>
                  </Grid>
                  <Grid item md={8} sm={10} xs={12}>
                    <Divider light />
                    <Paper className="claim-notification-content">
                      <Typography variant="body1">
                        If its an emergency, for immediate assistance please feel free to contact our
                        Customer Support Unit on
                        &nbsp;<span className="claim-contact">1800 209 1234</span>&nbsp;
                        for Car and Bike insurance claims.
                      </Typography>
                      <Typography variant="body1">
                        For Health, Travel and Term insurance claim, please contact us on
                        &nbsp;<span className="claim-contact">1800 209 4321</span>
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Modal>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
