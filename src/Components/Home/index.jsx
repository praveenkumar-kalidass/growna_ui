import React, {Component} from "react";
import {Collapse, Grid, Typography} from "@material-ui/core";
import Header from "./Elements/Header";
import Quote from "./Elements/Quote";
import Rating from "./Elements/Rating";
import Service from "./Elements/Service";
import Review from "./Elements/Review";
import Partner from "./Elements/Partner";
import About from "./Elements/About";
import Contact from "./Elements/Contact";
import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleIndexChange);
  }

  componentDidMount() {
    document.removeEventListener("keydown", this.handleIndexChange);
  }

  handleIndexChange = (event) => {
    let {index} = this.state;

    if (index && event.keyCode === 38) {
      index = index - 1;
    }
    if (index < 5 && event.keyCode === 40) {
      index = index + 1;
    }
    this.setState({
      index: index
    });
  }

  handleRouteChange = (index) => {
    this.setState({
      index: index
    });
  }

  render() {
    const {index} = this.state;

    return (
      <div className="gis-home">
        <Grid container justify="center">
          <Grid item md={10} sm={10} xs={12}>
            <Typography className="home-phone" variant="body1">
              Toll Free: <span className="phone-number">1800 266 6868</span>
            </Typography>
            <Header handleRoute={this.handleRouteChange} />
          </Grid>
        </Grid>
        <Collapse in={index === 0}>
          <Grid className="gis-home-part-0" container
            direction="column" justify="space-around">
            <Grid item>
              <Quote />
            </Grid>
            <Grid item>
              <Rating />
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={index === 1}>
          <Grid className="gis-home-part-1" container
            justify="center" alignItems="flex-start">
            <Grid item md={10} sm={10} xs={12}>
              <Service />
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={index === 2}>
          <Grid className="gis-home-part-2" container
            justify="center" alignItems="flex-start">
            <Grid item md={10} sm={10} xs={12}>
              <Review />
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={index === 3}>
          <Grid className="gis-home-part-3" container
            justify="center" alignItems="flex-start">
            <Grid item md={10} sm={10} xs={12}>
              <Partner />
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={index === 4}>
          <Grid className="gis-home-part-4" container
            justify="center" alignItems="flex-start">
            <Grid item md={10} sm={10} xs={12}>
              <About />
            </Grid>
          </Grid>
        </Collapse>
        <Collapse in={index === 5}>
          <Grid className="gis-home-part-5" container
            justify="center" alignItems="stretch">
            <Grid item>
              <Contact />
            </Grid>
          </Grid>
        </Collapse>
      </div>
    );
  }
}

export default Home;
