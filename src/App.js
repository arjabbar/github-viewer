import { AppBar, Button, Grid, Input, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from 'react';
import "whatwg-fetch";
import './App.css';
import UserList from './UserList';

let rootContainerStyles = {
  maxWidth: 960, 
  backgroundColor: 'white', 
  boxShadow: '2px 12px 15px darkgrey', 
  margin: 'auto', 
  minHeight: '100%',
  overflowY: 'scroll',
  justifyContent: 'center'
};

class App extends Component {

  constructor(props) {
    super(props);
    this.handleSearchClicked = this.handleSearchClicked.bind(this);
    this.handleSearchChanged = this.handleSearchChanged.bind(this);
    this.state = {
      users: null,
      searchQuery: null
    }
  }

  handleSearchClicked(event) {
    fetch(`https://api.github.com/search/users?q=${this.state.searchQuery}`)
  }

  handleSearchChanged(event) {
    console.debug(`Updating the query to ${event.target.value}`);
    this.setState({
      searchQuery: event.target.value
    });
  }

  render() {
    return (
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
                <Input type="text" placeholder="Search for users" style={{width: 250}} onChange={this.handleSearchChanged}/>
                <Button color="primary" onClick={this.handleSearchClicked}>Search</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Grid container style={rootContainerStyles} className="user-list" alignItems="center">
          {this.state.queryToExecute && <UserList query={this.state.queryToExecute}/>}
        </Grid>
      </div>
    );
  }
}

export default App;
