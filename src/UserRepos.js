import { AppBar, Button, IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow, Toolbar, Typography, withStyles } from '@material-ui/core';
import { Cancel } from "@material-ui/icons";
import { PropTypes } from "prop-types";
import React, { Component } from 'react';
import 'whatwg-fetch';
import LoadingContainer from './LoadingContainer';

let styles = {
  toolbar: {
    flex: 1,
    textAlign: 'left'
  }
}

class UserRepos extends Component {

  state = {
    loading: true,
    repos: []
  }

  static propTypes = {
    classes: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.handleCancelClicked = this.handleCancelClicked.bind(this)
  }

  handleCancelClicked(event) {
    this.props.history.goBack();
  }

  componentDidMount() {
    let userId = this.props.match.params.userId;
    fetch(`https://api.github.com/users/${userId}/repos`)
      .then(response => response.json())
      .then(repos => this.setState({ repos, loading: false }));
  }

  render() {
    return (
      <LoadingContainer loading={this.state.loading}>
      <AppBar color="default" position="static"
          className="search-metadata">
        <Toolbar>
          <Typography className={this.props.classes.toolbar} variant="subheading">
            Showing repos for {this.props.match.params.userId}
          </Typography>
          <IconButton onClick={this.handleCancelClicked}>
            <Cancel />
          </IconButton>
        </Toolbar>
      </AppBar>
        <div className="repo-list">
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Language
                  </TableCell>
                  <TableCell>
                    Forks
                  </TableCell>
                  <TableCell>
                    Watchers
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.repos.map(repo => (
                  <TableRow key={repo.id}>
                    <TableCell>
                      <Typography variant="subheading">
                        {repo.full_name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {repo.language}
                    </TableCell>
                    <TableCell numeric>
                      {repo.forks}
                    </TableCell>
                    <TableCell numeric>
                      {repo.watchers}
                    </TableCell>
                    <TableCell>
                      <Button component="a" href={repo.html_url} color="primary">Visit Github</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </LoadingContainer>
    );  
  }
}

export default withStyles(styles)(UserRepos);