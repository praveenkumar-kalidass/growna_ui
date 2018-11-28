import React, {Component} from "react";
import {Avatar, Badge, Grid, Paper, Typography} from "@material-ui/core";
import {Accessibility, ContactPhone, Games, Money, People, ThumbUpAlt} from "@material-ui/icons";
import _ from "underscore";
import "./style.scss";

class Service extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [{
        icon: Games,
        title: "Compare 250+ plans",
        body: "to save upto 30%"
      }, {
        icon: Accessibility,
        title: "Always at your service",
        body: "Toll free - 1800 258 5970"
      }, {
        icon: Money,
        title: "Over 10L Crore",
        body: "Cover provided"
      }, {
        icon: ContactPhone,
        title: "Cancellation Support",
        body: "Cancellations & Endorsements"
      }, {
        icon: People,
        title: "2443 People",
        body: "Currently comparing online"
      }, {
        icon: ThumbUpAlt,
        title: "IAMAI's best financial",
        body: "Website award 2013 - 14"
      }]
    };
  }
  render() {
    const {services} = this.state;
    return (
      <Grid className="gis-service" container justify="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container justify="center">
            <Grid item>
              <Typography className="service-head-title" variant="h4" gutterBottom>
                Insurance Made Easy
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Typography className="service-head-text" variant="h5" gutterBottom>
                by GIS way
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="space-around" spacing={16}>
          {
            _.map(services, (service, index) => <Grid key={index} item md={4}>
              <Paper elevation={2} className="service-container">
                <Grid className="service-items" container
                  direction="column" justify="space-around" alignItems="stretch">
                  <Grid item>
                    <service.icon className="service-icon" />
                  </Grid>
                  <Grid item>
                    <Typography className="service-label" variant="subtitle2" gutterBottom>
                      {service.title}
                    </Typography>
                    <Typography className="service-info" variant="body2" gutterBottom>
                      {service.body}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>)
          }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Service;
