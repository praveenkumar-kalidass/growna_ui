import React, {Component} from "react";
import {
  Paper,
  Step,
  StepLabel,
  Stepper
} from "@material-ui/core";
import AdminForm from "./Elements/AdminForm";
import TenantForm from "./Elements/TenantForm";
import TenantRegister from "./Elements/TenantRegister";
import "./style.scss";

class AddTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      tenantName: ""
    };
  }

  handleTenantForm = (tenantName) => {
    this.setState({
      stepIndex: 1,
      tenantName: tenantName
    });
  }

  render() {
    const {
      stepIndex,
      tenantName
    } = this.state;

    return (
      <Paper className="gis-add-tenant">
        <Stepper activeStep={stepIndex} alternativeLabel>
          <Step>
            <StepLabel>Register Tenant</StepLabel>
          </Step>
          <Step>
            <StepLabel>Enter Admin details for the Tenant</StepLabel>
          </Step>
          <Step>
            <StepLabel>Done</StepLabel>
          </Step>
        </Stepper>
        {
          stepIndex === 0 &&
          <TenantForm
            handleTenantForm={this.handleTenantForm} />
        }
        {
          stepIndex === 1 &&
          <AdminForm tenantName={tenantName} />
        }
        {
          stepIndex === 2 &&
          <TenantRegister />
        }
      </Paper>
    );
  }
}

export default AddTenant;
