import React, {Component} from "react";
import {Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import "./style.scss";

class Health extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: "",
      people: "",
      pincode: ""
    };
  }

  handleFieldChange = (event, name) => {
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  }

  render() {
    const {
      gender,
      people,
      pincode
    } = this.state;

    return (
      <Grid className="gis-health"
        container
        justify="center"
        alignItems="center"
        spacing={4}>
        <Grid item md={3} sm={5} xs={11}>
          <FormControl fullWidth>
            <InputLabel>
              Your Gender
            </InputLabel>
            <Select
              onChange={(event) => this.handleFieldChange(event, "gender")}
              value={gender}>
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"transgender"}>Others</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={4} sm={6} xs={11}>
          <FormControl fullWidth>
            <InputLabel>
              Who do you want to insure?
            </InputLabel>
            <Select
              onChange={(event) => this.handleFieldChange(event, "people")}
              value={people}>
              <MenuItem value={"father"}>Father</MenuItem>
              <MenuItem value={"mother"}>Mother</MenuItem>
              <MenuItem value={"spouse"}>Spouse</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item md={3} sm={5} xs={11}>
          <TextField
            fullWidth
            className="pincode"
            value={pincode}
            onChange={(event) => this.handleFieldChange(event, "pincode")}
            label="Enter your pincode"
            margin="normal" />
        </Grid>
        <Grid item md={6} sm={6}>
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

export default Health;
