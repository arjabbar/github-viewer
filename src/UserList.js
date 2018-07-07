import { Button, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';

class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        loading: true,
        query: props.query
      }
    }

    componentDidMount() {
      if (!this.state.query) {
        return this.setState({loading: false})
      }
      fetch('https://api.github.com/search/users?q=aj')
        .then(response => response.json())
        .then(results => this.setState({
          users: results.items,
          loading: false
        }));
    }

    render() {
      if (this.state.loading) {
        return (
          <CircularProgress style={{alignSelf: 'center'}} />
        );
      }

      return (
        <div className="user-list-container">
          {
            this.state.query && (
              <Typography align="left" variant="headline">
                Users matching "{this.state.query}"
              </Typography>
              )
          }
          <Grid container alignItems="flex-start">
            {this.state.users.map(user => (
              <User key={user.login} user={user} />
            ))}
          </Grid>
        </div>
      )
    }
}

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      user: props.user
    }
  }

  render() {
    return (
      <Grid item xs={4}>
        <Card style={{display: 'flex', padding: 15}}>
          <CardMedia image={this.state.user.avatar_url} title={this.state.user.login} style={{height: 100, width: 100}}>
          </CardMedia>
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.state.user.login}
            </Typography>
            <Button color="primary" variant="contained">View Repos</Button>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default UserList;