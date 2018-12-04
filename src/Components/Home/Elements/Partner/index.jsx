import React, {Component} from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import _ from "underscore";
import ApolloMunich from "../../../../Assets/apollo-munich-logo.png";
import BajajAlliance from "../../../../Assets/bajaj-alliance-logo.jpg";
import BharatiInsurance from "../../../../Assets/bharati-insurance-logo.png";
import FutureGenerali from "../../../../Assets/future-generali-logo.png";
import HdfcErgo from "../../../../Assets/hdfc-ergo-logo.png";
import IffcoTokio from "../../../../Assets/iffco-tokio-logo.jpg";
import Kotak from "../../../../Assets/kotak-insurance-logo.png";
import LibertyVideocon from "../../../../Assets/liberty-videocon-logo.jpg";
import Reliance from "../../../../Assets/reliance-insurance-logo.png";
import Star from "../../../../Assets/star-insurance-logo.png";
import "./style.scss";

class Partner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partners: [
        ApolloMunich,
        BajajAlliance,
        BharatiInsurance,
        FutureGenerali,
        HdfcErgo,
        IffcoTokio,
        Kotak,
        LibertyVideocon,
        Reliance,
        Star
      ]
    };
  }

  render() {
    const {partners} = this.state;

    return (
      <Grid className="gis-partner" direction="column" container
        justify="space-around" alignItems="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container justify="center">
            <Grid item>
              <Typography className="partner-head-title" variant="h4" gutterBottom>
                Our Partners
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={10} sm={11} xs={11}>
          <Grid container className="partner-logo-container" justify="flex-start" spacing={8}>
            {
              _.map(partners, (partner, index) => (
                <Grid key={index} item>
                  <Paper elevation={1} className="partner-logo-paper">
                    <Grid className="logo-container" container
                      justify="center" alignItems="center">
                      <Grid item>
                        <img className="partner-logo" src={partner} />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Partner;
