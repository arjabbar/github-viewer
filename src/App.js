import { AppBar, Button, Grid, Input, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from 'react';
import "whatwg-fetch";
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import UserRepos from './UserRepos';
import UserSearch from './UserSearch';
import qs from "qs";

class App extends Component {

  state = {
    searchQuery: null,
    loading: false,
    executedQuery: null,
    searchError: false
  }

  constructor(props) {
    super(props);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
  }

  handleSearchClicked(event) {
    event.preventDefault();
    if (this.state.searchQuery === this.state.executedQuery || this.state.searchError || !this.state.searchQuery) {
      return;
    }
    this.setState({
      executedQuery: this.state.searchQuery
    })
  }

  handleSearchChanged(event) {
    console.debug(`Updating the query to ${event.target.value}`);
    this.setState({
      searchQuery: event.target.value,
      searchError: !event.target.value
    });
  }

  componentDidMount() {
    // TODO: Grabbing the window is cheating. Find a way to do this within react router.
    this.setState({
      searchQuery: qs.parse(window.location.search).query
    });
  }

  render() {
    let { loading, executedQuery, searchError, searchQuery } = this.state;
    return (
      <Router>
        <div className="App">
          <AppBar className="App-intro flex" position="static" title="Github Viewer" color="default">
            <Toolbar>
              <Grid container>
                <Grid item xs={2}>
                  <Typography variant="title" color="inherit">
                    Github Viewer
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Route render={({history}) => (<Input error={searchError} 
                    type="text" 
                    placeholder="Search for users" 
                    autoFocus={true} 
                    onKeyPress={(event) => {
                      if (event.charCode === 13 && !this.state.searchError) {
                        history.push(`/search?query=${searchQuery}`);
                      }
                    }}
                    style={{width: 250}} 
                    onChange={this.handleSearchChanged} 
                    onSubmit={this.handleSearchClicked}/>)} />
                  <Button component={Link} to={`/search?query=${searchQuery}`} color="primary" onClick={this.handleSearchClicked} disabled={loading}>Search</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route exact={true} path="/search" component={UserSearch} executedQuery={executedQuery} />
          </Switch>
          <Route exact path="/users/:userId/repos" component={UserRepos} />
        </div>
      </Router>
    );
  }
}

export default App;
