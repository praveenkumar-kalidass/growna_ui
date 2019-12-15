import React, {Component} from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField
} from "@material-ui/core";
import "./style.scss";

class TermLife extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age: "",
      gender: "",
      mobileNumber: ""
    };
  }

  handleFieldChange = (event, name) => {
    let state = this.state;
    state[name] = event.target.value;
    this.setState(state);
  }

  render() {
    const {
      age,
      gender,
      mobileNumber
    } = this.state;

    return (
      <Grid className="gis-term-life"
        direction="row"
        container
        justify="center"
        spacing={4}>
        <Grid item md={5} sm={6} xs={10}>
          <TextField
            fullWidth
            value={mobileNumber}
            onChange={(event) => this.handleFieldChange(event, "mobileNumber")}
            label="Enter your Mobile Number"
            margin="normal" />
        </Grid>
        <Grid item md={4} sm={5} xs={10}>
          <TextField
            fullWidth
            value={age}
            onChange={(event) => this.handleFieldChange(event, "age")}
            label="Enter your Age"
            margin="normal" />
        </Grid>
        <Grid item md={5} sm={6} xs={10}>
          <FormControl fullWidth>
            <FormLabel>Select Gender</FormLabel>
            <RadioGroup row className="gender-group"
              name="gender"
              value={gender}
              onChange={(event) => this.handleFieldChange(event, "gender")}>
              <FormControlLabel value="female"
                control={<Radio color="primary" />}
                label="Female"
                labelPlacement="start" />
              <FormControlLabel value="male"
                control={<Radio color="primary" />}
                label="Male"
                labelPlacement="start" />
              <FormControlLabel value="transgender"
                control={<Radio color="primary" />}
                label="Others"
                labelPlacement="start" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item md={4} sm={5}>
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

export default TermLife;
