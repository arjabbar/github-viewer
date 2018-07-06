import { AppBar, Button, Grid, Input, Toolbar, Typography } from "@material-ui/core";
import React, { Component } from 'react';
import "whatwg-fetch";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: true
    }
  }
  
  componentDidMount() {
    fetch('https://api.github.com/search/users?q=aj')
      .then(response => response.json())
      .then(results => this.setState({
        users: results.items,
        loading: false
      }));
  }

  render() {
    let userList = null;
    if (this.state.loading) {
      userList = (<div>Loading</div>);
    } else {
      userList = this.state.users.map(user => {
        return (
          <div>{user.login}</div>
        )
      });
    }

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
                <Input type="text" placeholder="Search for users" style={{width: 250}}/>
                <Button>Search</Button>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className="user-list">
          {userList}
        </div>
      </div>
    );
  }
}

export default App;
