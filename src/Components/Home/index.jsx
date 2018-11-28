import React, {Component} from "react";
import {Collapse, Grid} from "@material-ui/core";
import Header from "./Elements/Header";
import Quote from "./Elements/Quote";
import Rating from "./Elements/Rating";
import Service from "./Elements/Service";
import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      animation: ""
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      this.handleIndexChange(event.keyCode);
    });
  }

  handleIndexChange = (keyCode) => {
    let {index} = this.state;
    let animation;

    if (index && keyCode === 38) {
      index = index - 1;
      animation = "slideInDown";
    }
    if (index < 2 && keyCode === 40) {
      index = index + 1;
      animation = "slideInUp";
    }
    this.setState({
      index: index,
      animation: animation
    });
  }

  render() {
    const {index, animation} = this.state;

    return (
      <div className="gis-home">
        <Grid container justify="center">
          <Grid item md={10} sm={10} xs={12}>
            <Header />
          </Grid>
        </Grid>
        <Collapse in={index === 0}>
          <Grid className="gis-home-part-0" container
            justify="center" alignItems="flex-start">
            <Grid item md={10} sm={10} xs={12}>
              <Quote />
            </Grid>
            <Grid item md={10} sm={10} xs={12}>
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
            </Grid>
          </Grid>
        </Collapse>
      </div>
    );
  }
}

export default Home;
