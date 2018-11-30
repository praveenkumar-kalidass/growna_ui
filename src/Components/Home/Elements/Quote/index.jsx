import React, {Component} from "react";
import {Grid, Paper, Tab, Tabs} from "@material-ui/core";
import {DirectionsBike, DirectionsCar, LocalHospital, Flight, Timer} from "@material-ui/icons";
import Bike from "../Bike";
import Car from "../Car";
import TermLife from "../TermLife";
import Health from "../Health";
import "./style.scss";

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: 0
    };
  }

  handleTabChange = (event, index) => {
    this.setState({
      quoteIndex: index
    });
  }

  render() {
    const {quoteIndex} = this.state;

    return (
        <Grid className="gis-home-quote" container justify="center">
          <Grid item md={8} sm={10} xs={12}>
            <Paper elevation={1}
              className="quote-paper">
              <Tabs
                fullWidth
                value={quoteIndex}
                onChange={this.handleTabChange}
                indicatorColor="primary"
                textColor="primary">
                <Tab icon={<DirectionsBike />} label="Bike" />
                <Tab icon={<DirectionsCar />} label="Car" />
                <Tab icon={<Timer />} label="Term Life" />
                <Tab icon={<LocalHospital />} label="Health" />
                <Tab icon={<Flight />} label="Travel" />
              </Tabs>
              <div className="quote-container">
                {quoteIndex === 0 && <Bike />}
                {quoteIndex === 1 && <Car />}
                {quoteIndex === 2 && <TermLife />}
                {quoteIndex === 3 && <Health />}
              </div>
            </Paper>
          </Grid>
        </Grid>
    );
  }
}

export default Quote;
