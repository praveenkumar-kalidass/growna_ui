import React, {Component} from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import "./style.scss";

class About extends Component {
  render() {
    return (
      <Grid className="gis-about" container direction="column"
        justify="space-around" alignItems="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container justify="center">
            <Grid item>
              <Typography className="about-head-title" variant="h4" gutterBottom>
                About us
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={10} sm={11} xs={11}>
          <Grid container justify="center">
            <Grid item>
              <Typography className="about-content index-paragraph" variant="subtitle1" gutterBottom>
                GROWNA INSTASERVICES PRIVATE LIMITED IS SIMPLY CALLED AS “GROWNA”.
                The name Growna denotes Grow In Assurance in all aspects of
                insurance industry. Growna driven by a vision to provide
                transparent and reliable insurance services for all types
                of Life Insurance, General Insurance and Risk Management
                Solutions. We are committed to provide honest, timely and
                research-backed information and insurance services
                to our customers.
                <br />
                <br />
              </Typography>
              <Typography className="about-content" variant="subtitle1" gutterBottom>
                Our aim is to provide a digital platform to serve insurance
                product and services to the customer on the spot.
                It should be single platform to provide quote, compare multiple
                insurer product, close sale on the spot, issue instant policy
                and also assist after sale services under one roof and
                one brand. This platform should simplify the insurance sales
                using recent technology and help the users to provide
                right risk solution to their customers in a very simple and
                customised way and out the large un-insured and under-insured
                masses of the country and overcome the gap in the present
                insurance services verticals like risk management,
                claims assistance and claims consultancy.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default About;
