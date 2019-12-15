import React, {Component} from "react";
import {Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import "./style.scss";

class Bike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bikeNumber: "",
      isExpired: ""
    };
  }

  handleFieldChange = (event, name) => {
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  }

  render() {
    const {
      bikeNumber,
      isExpired
    } = this.state;

    return (
      <Grid className="gis-bike"
        container
        justify="center"
        alignItems="center"
        spacing={4}>
        <Grid item md={5} sm={6} xs={10}>
          <TextField
            fullWidth
            className="bike-number"
            value={bikeNumber}
            onChange={(event) => this.handleFieldChange(event, "bikeNumber")}
            label="Enter your Bike Number"
            margin="normal" />
        </Grid>
        <Grid item md={4} sm={5} xs={10}>
          <FormControl fullWidth>
            <InputLabel htmlFor="is-expired">
              Is previous insurance expired?
            </InputLabel>
            <Select
              onChange={(event) => this.handleFieldChange(event, "isExpired")}
              value={isExpired}>
              <MenuItem value={true}>Yes</MenuItem>
              <MenuItem value={false}>No</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={12}>
          <Grid container justify="center">
            <Button variant="contained" size="large" color="primary">
              View Quote
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Bike;
