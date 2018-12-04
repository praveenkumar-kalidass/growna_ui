import React, {Component} from "react";
import {Avatar, IconButton, Grid, Paper, Slide, Typography} from "@material-ui/core";
import {KeyboardArrowLeft, KeyboardArrowRight} from "@material-ui/icons";
import Facebook from "../../../../Assets/facebook-logo.png";
import _ from "underscore";
import "./style.scss";

class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewIndex: 0,
      reviews: [[{
        avatar: Facebook,
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur unde suscipit, quam beatae rerum
          inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti?
          Eum quasi quidem quibusdam.`
      }, {
        avatar: Facebook,
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur unde suscipit, quam beatae rerum
          inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti?
          Eum quasi quidem quibusdam.`
      }], [{
        avatar: Facebook,
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur unde suscipit, quam beatae rerum
          inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti?
          Eum quasi quidem quibusdam.`
      }, {
        avatar: Facebook,
        comment: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Quos blanditiis tenetur unde suscipit, quam beatae rerum
          inventore consectetur, neque doloribus, cupiditate numquam
          dignissimos laborum fugiat deleniti?
          Eum quasi quidem quibusdam.`
      }]]
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", (event) => {
      this.handleIndexChange(event.keyCode);
    });
  }

  handleIndexChange = (keyCode) => {
    let {reviewIndex} = this.state;

    if (reviewIndex && keyCode === 37) {
      reviewIndex = reviewIndex - 1;
    }
    if (reviewIndex < 1 && keyCode === 39) {
      reviewIndex = reviewIndex + 1;
    }
    this.setState({
      reviewIndex: reviewIndex
    });
  }

  render() {
    const {reviewIndex, reviews} = this.state;

    return (
      <Grid className="gis-review" container direction="column"
        justify="space-around" alignItems="center">
        <Grid item md={10} sm={11} xs={11}>
          <Grid container justify="center">
            <Grid item>
              <Typography className="review-head-title" variant="h4" gutterBottom>
                GIS Reviews
              </Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <Grid item>
              <Typography className="review-head-text" variant="h5" gutterBottom>
                What our customers are saying...
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={10} sm={11} xs={11}>
          <Grid className="review-navigation-container" container
            justify="center" alignItems="center" spacing={8}>
            <Grid item md={1} sm={1} xs={1} className="navigation-item">
              <KeyboardArrowLeft onClick={() => this.handleIndexChange(37)}
                className="review-navigation-icon" />
            </Grid>
            <Grid item md={10} sm={10} xs={10}>
              <Grid container justify="center" spacing={16}>
                {
                  _.map(reviews, (review, index) => (
                    _.map(review, (comment, key) => (
                      reviewIndex === index
                      ? <Grid key={key} item md={6}
                          className="review-container animated fadeIn">
                          <Paper elevation={1} className="review-paper">
                            <Grid container justify="center" spacing={16}>
                              <Grid item>
                                <Avatar src={comment.avatar}
                                  className="review-avatar" />
                              </Grid>
                              <Grid item>
                                <Typography className="review-comment"
                                  variant="body2" gutterBottom>
                                  {comment.comment}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      : ""
                    ))
                  ))
                }
              </Grid>
            </Grid>
            <Grid item md={1} sm={1} xs={1} className="navigation-item">
              <KeyboardArrowRight onClick={() => this.handleIndexChange(39)}
                className="review-navigation-icon" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Review;
