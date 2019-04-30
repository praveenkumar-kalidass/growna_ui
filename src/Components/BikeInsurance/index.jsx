import React, {Component} from "react";
import {
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Step,
  Stepper,
  StepLabel,
  TextField,
  Typography
} from "@material-ui/core";
import {
  AddCircle
} from "@material-ui/icons";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Cookies from "universal-cookie";
import _ from "underscore";
import Strategy from "joi-validation-strategy";
import Validation from "react-validation-mixin";
import Routes from "../../Utils/Routes";
import {
  getBrands,
  getModelsByBrand,
  getVariantsByModel,
  getRegistrationCodes,
  saveQuotation
} from "../../Actions/Insurance";
import Schema from "./schema";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  brands: state.insurance.brands,
  models: state.insurance.models,
  variants: state.insurance.variants,
  registrationCodes: state.insurance.registrationCodes
});

const mapDispatchToProps = (dispatch) => ({
  getBrands: (type) => { dispatch(getBrands(type)) },
  getModelsByBrand: (brand, type) => { dispatch(getModelsByBrand(brand, type)) },
  getVariantsByModel: (brand, model, type) => { dispatch(getVariantsByModel(brand, model, type)) },
  getRegistrationCodes: () => { dispatch(getRegistrationCodes()) },
  saveQuotation: (data, callback) => { dispatch(saveQuotation(data, callback)) }
});

class BikeInsurance extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      brand: Schema.brand,
      model: Schema.model,
      variant: Schema.variant,
      vehicleYear: Schema.vehicleYear,
      registrationCode: Schema.registrationCode
    };
    this.state = {
      brand: "",
      model: "",
      variant: "",
      engineCc: "",
      vehicleYear: "",
      registrationCode: "",
      zoneType: "",
      modelIndex: 0,
      openBikeModal: false,
      loading: false,
      brands: [],
      models: [],
      variants: [],
      registrationCodes: []
    };
  }

  componentDidMount() {
    this.props.getRegistrationCodes();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      brands: nextProps.brands,
      models: nextProps.models,
      variants: nextProps.variants,
      registrationCodes: nextProps.registrationCodes
    });
  }

  getValidatorData = () => (this.state)

  handleModal = (openBikeModal) => (event) => {
    if (openBikeModal) {
      this.props.getBrands("BIKE");
    } else {
      this.props.validate();
    }
    this.setState({
      openBikeModal,
      modelIndex: 0
    });
  }

  handleChange = (field) => (event) => {
    if (field === "variant") {
      this.setState({
        engineCc: _.findWhere(this.state.variants,
          {
            variant: event.target.value
          }).engineCc
      });
    }
    if (field === "registrationCode") {
      this.setState({
        zoneType: _.findWhere(this.state.registrationCodes,
          {
            registrationCode: event.target.value
          }).zoneType
      });
    }
    this.setState({
      [field]: event.target.value
    });
  }

  handleModalIndex = () => {
    this.setState((state) => ({
      modelIndex: state.modelIndex + 1
    }));
    if (this.state.modelIndex === 0) {
      this.props.getModelsByBrand(this.state.brand, "BIKE");
    }
    if (this.state.modelIndex === 1) {
      this.props.getVariantsByModel(this.state.brand, this.state.model, "BIKE");
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const cookies = new Cookies();
    const gis = cookies.get("gis");
    const {
      brand,
      model,
      variant,
      engineCc,
      vehicleYear,
      registrationCode,
      zoneType
    } = this.state;
    this.props.validate((error) => {
      if (!error) {
        this.props.saveQuotation({
          brand, model, variant, engineCc,
          vehicleYear, registrationCode, zoneType,
          userId: gis.userId,
          tenantId: gis.tenantId,
          type: "BIKE"
        }, (data) => {
          this.props.history.push(Routes.QUOTATION.path.replace(":id", data.id));
        });
      }
    });
  }

  render() {
    const {
      brand,
      model,
      variant,
      vehicleYear,
      registrationCode,
      modelIndex,
      openBikeModal,
      loading,
      brands,
      models,
      variants,
      registrationCodes
    } = this.state;

    return (
      <Paper className="gis-bike-insurance">
        <Typography className="page-header" variant="h4" gutterBottom>
          Insurance for Bike
        </Typography>
        <Grid container justify="center" alignItems="center"
          className="form-container">
          <Grid item xs={12} sm={10} md={6}>
            <Paper elevation={1} className="bike-form">
              <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                <TextField
                  label="Select your bike model"
                  margin="normal"
                  value={`${brand} ${model} ${variant}`}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton color="primary" variant="contained"
                        onClick={this.handleModal(true)}>
                        <AddCircle />
                      </IconButton>
                    </InputAdornment>,
                    readOnly: true,
                  }}
                  helperText={
                    this.props.getValidationMessages("brand")[0] ||
                    this.props.getValidationMessages("model")[0] ||
                    this.props.getValidationMessages("variant")[0]
                  }
                  error={
                    !this.props.isValid("brand") ||
                    !this.props.isValid("model") ||
                    !this.props.isValid("variant")
                  } />
                <TextField
                  label="Select your bike registration year"
                  fullWidth
                  margin="normal"
                  value={vehicleYear}
                  required
                  select
                  helperText={this.props.getValidationMessages("vehicleYear")[0]}
                  error={!this.props.isValid("vehicleYear")}
                  onChange={this.handleChange("vehicleYear")}
                  onBlur={this.props.handleValidation("vehicleYear")}>
                  {
                    _.times(20, (index) => (
                      <MenuItem key={index} value={new Date().getFullYear() - index}>
                        {new Date().getFullYear() - index}
                      </MenuItem>
                    ))
                  }
                </TextField>
                <TextField
                  required
                  select
                  label="Select bike registration code"
                  value={registrationCode}
                  onChange={this.handleChange("registrationCode")}
                  onBlur={this.props.handleValidation("registrationCode")}
                  margin="normal"
                  fullWidth
                  error={!this.props.isValid("registrationCode")}
                  helperText={this.props.getValidationMessages("registrationCode")[0]}>
                  {
                    _.map(registrationCodes, (code) => (
                      <MenuItem key={code.registrationCode} value={code.registrationCode}>
                        {code.registrationCode} ({code.displayName})
                      </MenuItem>
                    ))
                  }
                </TextField>
                <Button type="submit" variant="contained" color="primary">
                  Get Quotes
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Dialog fullWidth open={openBikeModal} className="bike-model-dialog">
          <DialogTitle>
            Select your bike model
            <Stepper activeStep={modelIndex} alternativeLabel>
              <Step>
                <StepLabel>Choose brand</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choose model</StepLabel>
              </Step>
              <Step>
                <StepLabel>Choose variant</StepLabel>
              </Step>
            </Stepper>
          </DialogTitle>
          <DialogContent>
            <FormControl component="fieldset">
              {
                modelIndex === 0 &&
                <FormGroup row className="bike-model-group">
                  {
                    loading ?
                    <CircularProgress /> :
                    _.map(brands, (brandItem, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            color="primary"
                            checked={brand === brandItem.brand}
                            onChange={this.handleChange("brand")}
                            value={brandItem.brand} />
                        }
                        label={brandItem.brand} />
                    ))
                  }
                </FormGroup>
              }
              {
                modelIndex === 1 &&
                <FormGroup row className="bike-model-group">
                  {
                    loading ?
                    <CircularProgress /> :
                    _.map(models, (modelItem, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            color="primary"
                            checked={model === modelItem.model}
                            onChange={this.handleChange("model")}
                            value={modelItem.model} />
                        }
                        label={modelItem.model} />
                    ))
                  }
                </FormGroup>
              }
              {
                modelIndex === 2 &&
                <FormGroup row className="bike-model-group">
                  {
                    loading ?
                    <CircularProgress /> :
                    _.map(variants, (variantItem, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            color="primary"
                            checked={variant === variantItem.variant}
                            onChange={this.handleChange("variant")}
                            value={variantItem.variant} />
                        }
                        label={`${variantItem.variant} (${variantItem.engineCc} CC)`} />
                    ))
                  }
                </FormGroup>
              }
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleModal(false)}>
              Cancel
            </Button>
            {
              modelIndex === 0 &&
              <Button color="primary" variant="contained"
                disabled={!brand}
                onClick={this.handleModalIndex}>
                Next
              </Button>
            }
            {
              modelIndex === 1 &&
              <Button color="primary" variant="contained"
                disabled={!model}
                onClick={this.handleModalIndex}>
                Next
              </Button>
            }
            {
              modelIndex === 2 &&
              <Button color="primary" variant="contained"
                disabled={!variant}
                onClick={this.handleModal(false)}>
                Done
              </Button>
            }
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Validation(Strategy)(BikeInsurance)));
