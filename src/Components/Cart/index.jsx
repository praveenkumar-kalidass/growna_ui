import React, {Component} from "react";
import {
  Button,
  CircularProgress,
  Grid,
  Paper
} from "@material-ui/core";
import {connect} from "react-redux";
import {getCartDetails} from "../../Actions/Insurance";
import "./style.scss";

const mapStateToProps = (state) => ({
  loading: state.insurance.loading,
  cart: state.insurance.cart,
  quotation: state.insurance.quotation
});

const mapDispatchToProps = (dispatch) => ({
  getCartDetails: (id) => { dispatch(getCartDetails(id)) }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      cart: {},
      quotation: {}
    };
  }

  componentDidMount() {
    this.props.getCartDetails(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      loading: nextProps.loading,
      cart: nextProps.cart,
      quotation: nextProps.quotation
    });
  }

  render() {
    const {
      loading,
      cart,
      quotation
    } = this.state;

    return (
      <div className="gis-cart">
        <Paper className="cart-head-container">
          <Grid container justify="space-between">
            <Grid item></Grid>
            <Grid item>
              <Button color="primary">Select Another plan</Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper>
          {
            loading ?
            <Grid container justify="center">
              <Grid item>
                <CircularProgress />
              </Grid>
            </Grid> :
            <Grid container justify="space-around">
              <Grid item xs={12} sm={6} xs={4}></Grid>
              <Grid item xs={12} sm={6} xs={4}></Grid>
              <Grid item xs={12} sm={6} xs={4}></Grid>
            </Grid>
          }
        </Paper>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
