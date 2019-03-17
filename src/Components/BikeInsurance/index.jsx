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
  saveQuotation
} from "../../Actions/Insurance";
import Schema from "./schema";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  brands: state.insurance.brands,
  models: state.insurance.models,
  variants: state.insurance.variants
});

const mapDispatchToProps = (dispatch) => ({
  getBrands: (type) => { dispatch(getBrands(type)) },
  getModelsByBrand: (brand, type) => { dispatch(getModelsByBrand(brand, type)) },
  getVariantsByModel: (brand, model, type) => { dispatch(getVariantsByModel(brand, model, type)) },
  saveQuotation: (data, callback) => { dispatch(saveQuotation(data, callback)) }
});

class BikeInsurance extends Component {
  constructor(props) {
    super(props);
    this.validatorTypes = {
      brand: Schema.brand,
      model: Schema.model,
      variant: Schema.variant
    };
    this.state = {
      brand: "",
      model: "",
      variant: "",
      modelIndex: 0,
      openBikeModal: false,
      loading: false,
      brands: [],
      models: [],
      variants: []
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      brands: nextProps.brands,
      models: nextProps.models,
      variants: nextProps.variants
    });
  }

  getValidatorData = () => (this.state)

  handleModal = (openBikeModal) => (event) => {
    if (openBikeModal) {
      this.props.getBrands("BIKE");
    } else {
      this.props.validate();
    }
    this.setState({openBikeModal});
  }

  handleChange = (field) => (event) => {
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
      variant
    } = this.state;
    this.props.validate((error) => {
      if (!error) {
        this.props.saveQuotation({
          brand, model, variant,
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
      modelIndex,
      openBikeModal,
      loading,
      brands,
      models,
      variants
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
                            checked={brand === brandItem}
                            onChange={this.handleChange("brand")}
                            value={brandItem} />
                        }
                        label={brandItem} />
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
                            checked={model === modelItem}
                            onChange={this.handleChange("model")}
                            value={modelItem} />
                        }
                        label={modelItem} />
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
                            checked={variant === variantItem}
                            onChange={this.handleChange("variant")}
                            value={variantItem} />
                        }
                        label={variantItem} />
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
