import React, {Component} from "react";
import {Link} from "react-router-dom";
import {
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Paper,
  Step,
  Stepper,
  StepLabel,
  TextField,
  Typography
} from "@material-ui/core";
import Routes from "../../Utils/Routes";
import RoleForm from "./Elements/RoleForm";
import RolePrivilegeForm from "./Elements/RolePrivilegeForm";
import RoleRegister from "./Elements/RoleRegister";
import "./style.scss";

class AddRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      role: {}
    };
  }

  handleRoleForm = (role) => {
    this.setState({
      stepIndex: 1,
      role
    });
  }

  handleStep = (step) => {
    this.setState({
      stepIndex: step
    });
  }

  render() {
    const {
      stepIndex,
      role
    } = this.state;

    return (
      <Paper className="gis-add-role">
        <Grid container justify="space-between" alignItems="center">
          <Typography className="form-header" variant="h4" gutterBottom>
            Add Role
          </Typography>
          <Button color="primary" component={Link} to={Routes.ROLE_LIST.path}>
            <Routes.ROLE_LIST.icon />
            Role List
          </Button>
        </Grid>
        <Stepper activeStep={stepIndex} alternativeLabel>
          <Step>
            <StepLabel>Add new Role</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select Permissions for Role</StepLabel>
          </Step>
          <Step>
            <StepLabel>Done</StepLabel>
          </Step>
        </Stepper>
        {
          stepIndex === 0 &&
          <RoleForm handleRoleForm={this.handleRoleForm} />
        }
        {
          stepIndex === 1 &&
          <RolePrivilegeForm
            role={role}
            handlePrivilegeForm={() => this.handleStep(2)} />
        }
        {
          stepIndex === 2 &&
          <RoleRegister addMoreRole={() => this.handleStep(0)} />
        }
      </Paper>
    );
  }
}

export default AddRole;
