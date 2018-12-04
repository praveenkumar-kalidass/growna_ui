import React, {Component} from "react";
import {Avatar, Chip, Divider, Grid, Paper, Typography} from "@material-ui/core";
import ContactUs from "../../../../Assets/gis-contact.jpg";
import Google from "../../../../Assets/google-logo.png";
import Facebook from "../../../../Assets/facebook-logo.png";
import Instagram from "../../../../Assets/instagram-logo.png";
import Linkedin from "../../../../Assets/linkedin-logo.png";
import Twitter from "../../../../Assets/twitter-logo.png";
import "./style.scss";

class Contact extends Component {
  render() {
    return (
      <Grid className="gis-contact" container direction="column"
        justify="space-between" alignItems="center">
        <Grid className="contact-us-container" item>
          <Grid container justify="center">
            <Grid item md={8}>
              <Typography className="contact-us-title" variant="h4" gutterBottom>
                Contact Us
              </Typography>
            </Grid>
            <Grid item md={8}>
              <Grid container justify="center" spacing={32}>
                <Grid item md={4}>
                  <img src={ContactUs} className="contact-us-image" />
                </Grid>
                <Grid item md={7}>
                  <Typography className="contact-label" variant="h6" gutterBottom>
                    Email: <Chip className="contact-chip" label="xxx_xxx@gmail.com" />
                  </Typography>
                  <Typography className="contact-label" variant="h6" gutterBottom>
                    Call: <Chip className="contact-chip" label="xxx_xxx_xxxxxx" />
                  </Typography>
                  <Divider className="contact-divider" />
                  <Grid className="logo-container" container justify="center" spacing={8}>
                    <Grid item>
                      <Avatar src={Google} />
                    </Grid>
                    <Grid item>
                      <Avatar src={Facebook} />
                    </Grid>
                    <Grid item>
                      <Avatar src={Instagram} />
                    </Grid>
                    <Grid item>
                      <Avatar src={Linkedin} />
                    </Grid>
                    <Grid item>
                      <Avatar src={Twitter} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item md={8}>
              <Typography className="contact-us-text" variant="h6" gutterBottom>
                Want to ensure an answer about insurance?
                Reach out to us! Our replies are better.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Paper elevation={1} className="contact-us-footer">
            <Grid container justify="center">
              <Grid item md={8} sm={10} xs={10}>
                <Grid container justify="space-between">
                  <Grid item md={4}>
                    <Typography className="footer-text" variant="subtitle2" gutterBottom>
                      Growna General Insurance Ltd.
                    </Typography>
                  </Grid>
                  <Grid item md={7}>
                    <Grid container justify="space-between">
                      <Grid item>
                        <Typography className="footer-text" variant="subtitle2">
                          COMPANY
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          About Us
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Board of Directors
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Careers
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Articles
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className="footer-text" variant="subtitle2" gutterBottom>
                          SUPPORT
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Consumer Buying Process
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Cancellations & Refunds
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Customer Service
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Downloads
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography className="footer-text" variant="subtitle2" gutterBottom>
                          LEGAL
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Privacy Policy
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Terms & Conditions
                        </Typography>
                        <Typography className="footer-text" variant="subtitle1">
                          Financials & Disclosures
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default Contact;
