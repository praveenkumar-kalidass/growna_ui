import React, {Component} from "react";
import {Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import "./style.scss";

class Car extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carNumber: "",
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
      carNumber,
      isExpired
    } = this.state;

    return (
      <Grid className="gis-car"
        container
        justify="center"
        alignItems="center"
        spacing={16}>
        <Grid item md={5} sm={6} xs={10}>
          <TextField
            fullWidth
            className="car-number"
            value={carNumber}
            onChange={(event) => this.handleFieldChange(event, "carNumber")}
            label="Enter your Car Number"
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

export default Car;
