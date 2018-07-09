import React, { Component } from 'react';
import SearchMetadataBar from './SearchMetadataBar';
import LoadingContainer from './LoadingContainer';
import UserList from './UserList';
import 'whatwg-fetch';
import { Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import qs from "qs";

export default class UserSearch extends Component {
  constructor(props) {
    super(props);
    let query = qs.parse(props.location.search).query;
    this.state = {
      executedQuery: query,
      loading: true,
      users: []
    };
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentWillReceiveProps(props) {
    let query = qs.parse(props.location.search).query;
    if (query !== this.state.executedQuery) {
      this.setState({
        executedQuery: query
      }, this.fetchUsers);
    }
  }

  fetchUsers() {
    this.setState({
      loading: true
    });
    fetch(`https://api.github.com/search/users?q=${this.state.executedQuery}`)
      .then(response => response.json()).then(json => {
        this.setState({
          users: json.items,
          loading: false
        });
      });
  }
  
  render() {
    let { users, executedQuery, loading } = this.state;
    if (!users) {
      return (
        <div>
          <Typography variant="headline">
            No Users found!
          </Typography>
          <Button component={Link} to="/">Go Back</Button>
        </div>
      );
    }
    return (
      <LoadingContainer loading={loading} >
        <div className="user-search-results">
          <SearchMetadataBar numberOfMatches={users.length} executedQuery={executedQuery} />
          <UserList users={users}/>
        </div>
      </LoadingContainer>
      )
  }
}