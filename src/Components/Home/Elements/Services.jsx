import React, {Component} from "react";
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import Service from "../Assets/services.png";

class Services extends Component {
  render() {
    return (
      <Grid className="home-services" container justify="center">
        <Grid item md={10}>
          <Grid container justify="center">
            <Grid item>
              <Typography className="services-heading" variant="h5" component="p">
                Our Services
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={10}>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <Card className="services-card">
                <CardActionArea>
                  <CardMedia className="card-image" image={Service} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Best Plan
                    </Typography>
                    <Typography component="p">
                      We lead clients through accelerating change, helping them harness the power of technology to deliver new.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card className="services-card">
                <CardActionArea>
                  <CardMedia className="card-image" image={Service} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Best Plan
                    </Typography>
                    <Typography component="p">
                      We lead clients through accelerating change, helping them harness the power of technology to deliver new.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card className="services-card">
                <CardActionArea>
                  <CardMedia className="card-image" image={Service} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Best Plan
                    </Typography>
                    <Typography component="p">
                      We lead clients through accelerating change, helping them harness the power of technology to deliver new.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Services;
