import { AppBar, Button, Grid, Input, Toolbar, Typography } from "@material-ui/core";
import * as parseLinkHeader from 'parse-link-header';
import React, { Component } from 'react';
import "whatwg-fetch";
import './App.css';
import UserList from './UserList';
import SearchMetadataBar from './SearchMetadataBar';
import LoadingContainer from './LoadingContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

  state = {
    users: [],
    searchQuery: null,
    loading: false,
    executedQuery: null,
    searchError: false
  }

  constructor(props) {
    super(props);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.handleKeyPressed = this.handleKeyPressed.bind(this);
  }

  handleKeyPressed(event) {
    if (event.charCode == 13) {
      this.executeSearch();
    }
  }

  handleSearchClicked(event) {
    if (this.state.searchQuery == this.state.executedQuery) {
      return;
    }
    this.executeSearch();
  }

  handleSearchChanged(event) {
    console.debug(`Updating the query to ${event.target.value}`);
    this.setState({
      searchQuery: event.target.value,
      searchError: !event.target.value
    });
  }

  executeSearch() {
    let executedQuery = this.state.searchQuery;
    if (this.state.searchError) {
      return;
    }

    fetch(`https://api.github.com/search/users?q=${executedQuery}`)
      .then(response => {
        let linkHeader = response.headers.get('Link');
        if (linkHeader) {
          let linkHeaderObj = parseLinkHeader(linkHeader);
          this.setState({
            numberOfPages: linkHeaderObj.last.page,
            currentPage: 1
          })
        }
        return response.json();
      }).then(json => {
        this.setState({
          users: json.items,
          pageSize: json.items.length,
          loading: false,
          executedQuery
        });
      });
  }

  render() {
    let { users, loading, executedQuery, searchError } = this.state;
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
                  <Input error={searchError} type="text" placeholder="Search for users" autoFocus={true} onKeyPress={this.handleKeyPressed} style={{width: 250}} onChange={this.handleSearchChanged} onSubmit={this.handleSearchClicked}/>
                  <Button color="primary" onClick={this.handleSearchClicked} disabled={loading}>Search</Button>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <LoadingContainer loading={loading}>
            <Route exact path="/">
              <div>
                <SearchMetadataBar numberOfMatches={users.length} executedQuery={executedQuery} />
                <UserList users={users}/>
              </div>
            </Route>
          </LoadingContainer>
        </div>
      </Router>
    );
  }
}

export default App;
