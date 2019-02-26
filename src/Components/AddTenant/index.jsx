import React, {Component} from "react";
import {
  Paper,
  Step,
  StepLabel,
  Stepper
} from "@material-ui/core";
import AdminForm from "./Elements/AdminForm";
import TenantForm from "./Elements/TenantForm";
import PrivilegeForm from "./Elements/PrivilegeForm";
import TenantRegister from "./Elements/TenantRegister";
import "./style.scss";

class AddTenant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stepIndex: 0,
      tenantName: "",
      user: {}
    };
  }

  handleTenantForm = (tenantName) => {
    this.setState({
      stepIndex: 1,
      tenantName
    });
  }

  handleAdminForm = (user) => {
    this.setState({
      stepIndex: 2,
      user
    });
  }

  handleStepChange = (index) => {
    this.setState({
      stepIndex: index
    });
  }

  render() {
    const {
      stepIndex,
      tenantName,
      user
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
            <StepLabel>Select Privileges for Admin</StepLabel>
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
          <AdminForm
            handleAdminForm={this.handleAdminForm}/>
        }
        {
          stepIndex === 2 &&
          <PrivilegeForm
            tenantName={tenantName}
            user={user}
            handlePrivilegeForm={() => this.handleStepChange(3)}/>
        }
        {
          stepIndex === 3 &&
          <TenantRegister
            addMoreTenant={() => this.handleStepChange(0)}/>
        }
      </Paper>
    );
  }
}

export default AddTenant;
