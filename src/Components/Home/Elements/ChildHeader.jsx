import React, {Component} from "react";
import {AppBar, Grid, Input, InputAdornment, Tabs, Tab, TextField, Toolbar, Typography} from "@material-ui/core";
import {Search} from "@material-ui/icons";

class ParentHeader extends Component {
  render() {
    return (
      <AppBar className="home-child-header" position="static">
        <Toolbar className="toolbar" variant="dense">
          <Grid container justify="center">
            <Grid item md={10}>
              <Grid container alignItems="center">
                <Grid item md={8}>
                  <Tabs value={0}>
                    <Tab label="Tab One" />
                    <Tab label="Tab Two" />
                    <Tab label="Tab Three" />
                  </Tabs>
                </Grid>
                <Grid item md={4}>
                  <Grid container spacing={8} justify="flex-end">
                    <Grid item>
                      <Input
                        className="search-input"
                        type="search"
                        startAdornment={
                          <InputAdornment className="search-icon" position="start">
                            <Search />
                          </InputAdornment>
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default ParentHeader;
